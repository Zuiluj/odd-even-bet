import { useState, useEffect } from "react";

import web3 from "../ethereum/web3";
import BetGame from "../ethereum/oddEvenBet";
import SplitSection from "../components/splitSection";

const ViewGame = (props) => {
  const [game, setGame] = useState({});
  const [oddBettors, setOddBettors] = useState(0);
  const [evenBettors, setEvenBettors] = useState(0);

  const renderGame = async (addr) => {
    const betGame = BetGame(addr);
    setOddBettors(await betGame.methods.oddBettorCount().call());
    setEvenBettors(await betGame.methods.evenBettorCount().call());
  };

  useEffect(() => {
    const betGame = BetGame(props.match.params.addr);
  }, []);

  return (
    <div>
      <SplitSection
        oddBettors={oddBettors}
        evenBettors={evenBettors}
        gameAddress={props.match.params.addr}
      />
    </div>
  );
};

export default ViewGame;
