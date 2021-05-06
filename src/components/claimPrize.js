import { useState } from "react";
import { Button, Message } from "semantic-ui-react";

import OddEvenGame from "../ethereum/oddEvenBet";
import web3 from "../ethereum/web3";

const ClaimPrize = (props) => {
    const { validGame, gameAddr } = props;
    const [loading, setLoading] = useState(false);
    const [errMsg, setErr] = useState("");

    const onClick = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErr("");
        const oddEvenGame = OddEvenGame(gameAddr);

        try {
            window.ethereum.enable();
            const accounts = await web3.eth.getAccounts();
            await oddEvenGame.methods.getPrize().send({
                from: accounts[0],
            });
        } catch (err) {
            setErr(err.message);
        }

        setLoading(false);
    };
    return (
        <div>
            <Button
                basic
                color="green"
                fluid
                loading={loading}
                onClick={onClick}
                disabled={validGame}
            >
                Claim Prize!
            </Button>
            {errMsg ? <Message negative> {errMsg} </Message> : ""}
        </div>
    );
};

export default ClaimPrize;
