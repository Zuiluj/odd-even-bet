pragma solidity ^0.4.17;
    
    contract BetFactory {
        address[] public deployedBetGames;
        
        function createCampaign() public {
            address newBetGame = new OddEvenBet(msg.sender);
            deployedBetGames.push(newBetGame);
        }
        
        function getDeployedGames() public view returns (address[]) {
            return deployedBetGames;
        }
    }
    
    contract OddEvenBet {
        address public manager;
        mapping(address => bool) public oddBettors;
        mapping(address => bool) public evenBettors;
        string[] winChoice = ['even', 'odd'];
        uint public oddBettorCount;
        uint public evenBettorCount;
        string public winningDecision;
        
        function OddEvenBet(address creator) public {
            manager = creator;
        }
        
        function random() private view returns (uint) {
            // pseudo-random picking
            return uint(keccak256(block.difficulty, now, manager));
        }
        
        function compareStringsbyBytes(string s1, string s2) public pure returns(bool){
            return keccak256(s1) == keccak256(s2);
        }
        
        function getWinner() public restricted decisionMade {
            winningDecision = winChoice[random() % 2];
        }    
        
        function getPrize() public {
            if (compareStringsbyBytes(winningDecision, "even")) {
                require(evenBettors[msg.sender]);
                msg.sender.transfer(this.balance / evenBettorCount);
                evenBettorCount--;
                evenBettors[msg.sender] = false;
            } else if (compareStringsbyBytes(winningDecision, "odd"))  {
                require(oddBettors[msg.sender]);
                msg.sender.transfer(this.balance / oddBettorCount);
                evenBettorCount--;
                oddBettors[msg.sender] = false;
            } else {
                require(false);
            }
        }
        
        modifier restricted() {
            require(msg.sender == manager);
            _;
        }
        
        modifier decisionMade() {
            // void the operation if winner was already picked
            require(compareStringsbyBytes(winningDecision, ""));
            _;
        }
        
        function bet(string betChoice) public decisionMade payable {
            // add player with mapping -> true that means
            // the player haven't claimed their prize yet
            if (compareStringsbyBytes(betChoice, 'even'))  {
                evenBettors[msg.sender] = true;
                evenBettorCount++;
            } else {
                oddBettors[msg.sender] = true;
                oddBettorCount++;
            }
            
        }
    
        function getPrizePool() public view returns (uint) {
            return this.balance;
        }
    
    }