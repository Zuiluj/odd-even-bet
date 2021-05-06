import { useState } from "react";
import {
    Segment,
    Button,
    Header,
    Grid,
    Message,
    Icon,
} from "semantic-ui-react";

import betFactory from "../ethereum/betFactory";
import web3 from "../ethereum/web3";
import Helmet from "../components/Helmet";

const CreateGame = (props) => {
    const [loading, setLoading] = useState(false);
    const [errMsg, setErr] = useState("");

    const createGame = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErr("");
        try {
            window.ethereum.enable();
            const accounts = await web3.eth.getAccounts();
            await betFactory.methods.createGame().send({
                from: accounts[0],
            });
        } catch (err) {
            setErr(err.message);
        }

        setLoading(false);
        props.history.push("/");
    };

    return (
        <div>
            <Helmet subTitle="Create game" />
            <Segment placeholder>
                <Header icon as="h2" style={{ margin: "10px 0" }}>
                    <Icon name="gamepad" circular />
                    <br />
                    Create new game?
                </Header>
                <Segment.Inline>
                    <Button
                        loading={loading}
                        fluid
                        basic
                        color="green"
                        onClick={createGame}
                    >
                        YES
                    </Button>
                    <Button
                        fluid
                        basic
                        color="orange"
                        onClick={() => {
                            props.history.push("/");
                        }}
                    >
                        NO
                    </Button>
                </Segment.Inline>
                {errMsg ? <Message negative> {errMsg} </Message> : ""}
            </Segment>
        </div>
    );
};

export default CreateGame;
