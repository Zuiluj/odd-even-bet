import { Divider, Grid, Header, Segment } from "semantic-ui-react";
import { FaDiceThree, FaDiceSix } from "react-icons/fa";

import Section from "../components/section";
import EnterGame from "../components/enterGame";
import PickWinner from "../components/pickWinner";
import ClaimPrize from "../components/claimPrize";

const SplitSection = (props) => {
    const { validGame, winner } = props;
    return (
        <div>
            <Divider horizontal></Divider>
            <Header block as="h2" textAlign="center" attached="top">
                {winner != "" && (
                    <div>
                        WINNER:
                        <br />
                        <span
                            style={{
                                color: "#CF4130",
                                textTransform: "uppercase",
                                fontWeight: "bold",
                                fontSize: "40px",
                            }}
                        >
                            {winner}
                        </span>
                    </div>
                )}
            </Header>
            <Segment
                style={{
                    color: "#4CB393",
                    overflowX: "hidden",
                    fontSize: "20px",
                    fontWeight: "bold",
                    textAlign: "center",
                }}
                attached
            >
                {props.gameAddress}
            </Segment>
            <Segment placeholder>
                <Grid container columns={2} textAlign="center">
                    <Divider vertical>And</Divider>

                    <Section
                        header="Odd Bettors"
                        icon={<FaDiceThree style={{ fontSize: "50px" }} />}
                        footer={`${props.oddBettors} Players`}
                        form={
                            <EnterGame
                                disabled={!validGame}
                                category="odd"
                                gameAddr={props.gameAddress}
                            />
                        }
                    />

                    <Section
                        header="Even Bettors"
                        icon={<FaDiceSix style={{ fontSize: "50px" }} />}
                        footer={`${props.evenBettors} Players`}
                        form={
                            <EnterGame
                                disabled={!validGame}
                                category="even"
                                gameAddr={props.gameAddress}
                            />
                        }
                    />
                </Grid>
            </Segment>
            <Segment>
                <Grid columns={2} stackable textAlign="center">
                    <Grid.Row>
                        <Grid.Column>
                            <PickWinner
                                validGame={!validGame}
                                gameAddr={props.gameAddress}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <ClaimPrize
                                validGame={validGame}
                                gameAddr={props.gameAddress}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </div>
    );
};

export default SplitSection;
