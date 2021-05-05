import { useState, useEffect } from 'react';
import { Button, Form, Segment, Message } from 'semantic-ui-react';

import OddEvenGame from '../ethereum/oddEvenBet';
import web3 from '../ethereum/web3';

const enterGame = (props) => {
    const { category, gameAddr, disabled } = props;
    const [loading, setLoading] = useState(false);
    const [errMsg, setErr] = useState('');
    const [value, setValue] = useState(0);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErr('');
        const oddEvenGame = OddEvenGame(gameAddr);

        try {
            const accounts = await web3.eth.getAccounts();
            await oddEvenGame.methods.bet(category).send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether'),
            });
        } catch (err) {
            setErr(err.message);
        }

        setLoading(false);
        setValue('');
    };

    return (
        <div>
            <Segment inverted>
                <Form
                    inverted
                    loading={loading}
                    error={!!errMsg}
                    onSubmit={onSubmit}
                >
                    <Form.Group widths="equal">
                        <Form.Input
                            fluid
                            label="BET VALUE"
                            placeholder="Value in (ether)"
                            type="number"
                            value={value}
                            disabled={disabled}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </Form.Group>
                    <Button primary type="submit">
                        Bet!
                    </Button>
                </Form>
            </Segment>
        </div>
    );
};

export default enterGame;
