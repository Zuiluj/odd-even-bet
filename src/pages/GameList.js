import React, { useEffect, useState } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import web3 from "../ethereum/web3";
import factory from "../ethereum/betFactory";
import Helmet from "../components/Helmet";

const GameList = () => {
    const [games, setGames] = useState([]);

    useEffect(async () => {
        let betGames = await factory.methods.getDeployedGames().call();
        setGames(betGames.toString().split(","));
    }, []);

    const listGames = () => {
        const items = games.map((game) => {
            return {
                header: game,
                description: <Link to={`/${game}`}>View Game</Link>,
                fluid: true,
            };
        });
        return <Card.Group items={items} />;
    };

    return (
        <div className="block">
            <Helmet subTitle="Game List" />
            {listGames()}
        </div>
    );
};

export default GameList;
