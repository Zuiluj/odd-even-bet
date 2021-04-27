import React, { useEffect, useState } from "react";

import web3 from "../ethereum/web3";
import factory from "../ethereum/betFactory";

const GameList = () => {
    const [games, setGames] = useState([]);

    useEffect(async () => {
        let betGames = await factory.methods.getDeployedGames().call();
        setGames(betGames);
    }, [games]);

    return (
        <div className="block">
            <h1>test</h1>
        </div>
    );
};

export default GameList;
