import { useState, useEffect } from 'react';

import web3 from '../ethereum/web3';
import BetGame from '../ethereum/oddEvenBet';
import SplitSection from '../components/splitSection';

const ViewGame = (props) => {
    const [game, setGame] = useState({});
    const [oddBettors, setOddBettors] = useState(0);
    const [evenBettors, setEvenBettors] = useState(0);
    const [validGame, setValidGame] = useState(true);
    const [winner, setWinner] = useState('');

    useEffect(async () => {
        const betGame = BetGame(props.match.params.addr);
        setOddBettors(await betGame.methods.oddBettorCount().call());
        setEvenBettors(await betGame.methods.evenBettorCount().call());

        setWinner(await betGame.methods.winningDecision().call());
        setValidGame(winner ? false : true);
    }, [winner]);

    return (
        <div>
            <SplitSection
                oddBettors={oddBettors}
                evenBettors={evenBettors}
                gameAddress={props.match.params.addr}
                validGame={validGame}
                winner={winner}
            />
        </div>
    );
};

export default ViewGame;
