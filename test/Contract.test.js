const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);

const compiledDeployer = require('../ethereum/build/BetFactory.json');
const compiledBettingGame = require('../ethereum/build/OddEvenBet.json');

let accounts;
let deployer;
let betGameAddress;
let betGame;

const INITIAL_STRING = 'Hi there!';
beforeEach(async () => {
    // Get a list of all acc
    accounts = await web3.eth.getAccounts();

    deployer = await new web3.eth.Contract(
        JSON.parse(compiledDeployer.interface)
    )
        .deploy({ data: compiledDeployer.bytecode })
        .send({ from: accounts[0], gas: '1000000' });

    await deployer.methods.createGame().send({
        from: accounts[0],
        gas: '1000000',
    });

    [betGameAddress] = await deployer.methods.getDeployedGames().call();

    betGame = await new web3.eth.Contract(
        JSON.parse(compiledBettingGame.interface),
        betGameAddress
    );
});

describe('Betting Game', () => {
    it('deploys a contract', () => {
        assert.ok(deployer.options.address);
        assert.ok(betGame.options.address);
    });

    it('marks the deployer as the betGame manager', async () => {
        const manager = await betGame.methods.manager().call();
        assert.strictEqual(manager, accounts[0]);
    });

    it('requires minimum bet amount to enter', async () => {
        try {
            await betGame.methods.bet('even').send({
                value: '01',
                from: accounts[1],
            });

            assert(false);
        } catch (err) {
            assert(true);
        }
    });

    it('lets participant to join the game by betting', async () => {
        await betGame.methods.bet('even').send({
            value: '101',
            from: accounts[1],
        });
        await betGame.methods.bet('odd').send({
            value: '101',
            from: accounts[2],
        });
        const evenBettorCount = await betGame.methods.evenBettorCount().call();
        const oddBettorCount = await betGame.methods.oddBettorCount().call();
        assert.ok(evenBettorCount > 0);
        assert.ok(oddBettorCount > 0);
    });

    it('requires a manager to pick the winner', async () => {
        try {
            await betGame.methods.getWinner().send({
                from: accounts[1],
                gas: '1000000',
            });

            assert(false);
        } catch (err) {
            assert(true);
        }
    });

    it('processes winning decision and lets winners take their prize', async () => {
        await betGame.methods.bet('even').send({
            value: '101',
            from: accounts[1],
        });
        await betGame.methods.bet('odd').send({
            value: '101',
            from: accounts[2],
        });

        let account;
        await betGame.methods.getWinner().send({
            from: accounts[0],
            gas: '1000000',
        });
        const winningDecision = await betGame.methods.winningDecision().call();

        if (winningDecision == 'even') {
            await betGame.methods.getPrize().send({
                from: accounts[1],
                gas: '1000000',
            });
            account = accounts[1];
        } else {
            await betGame.methods.getPrize().send({
                from: accounts[2],
                gas: '1000000',
            });
            account = accounts[2];
        }

        // const balance = await web3.eth.getBalance(account);
        // the winner received the prize if their account is equivalent
        // to the prize pool
        const balance = await web3.eth.getBalance(account);
        const prizePool = await betGame.methods.getPrizePool().call();
        console.log(`\n\nPRIZE POOL: ${prizePool} \n\n`);

        assert.ok(winningDecision);
        assert.ok(balance > '100');
        assert.ok(prizePool == 0);
    });

    it('does not let anyone enter once decision is done', async () => {
        // through the procedure of the test, winner is already
        // picked before even calling this function
        try {
            await betGame.methods.bet('even').send({
                from: accounts[3],
            });
            assert(false);
        } catch (err) {
            assert(true);
        }
    });
});
