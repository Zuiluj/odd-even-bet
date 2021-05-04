import { Divider, Grid, Header, Segment } from "semantic-ui-react";
import { FaDiceThree, FaDiceSix } from "react-icons/fa";
import Section from "../components/section";

const SplitSection = (props) => {
  return (
    <div>
      <Divider horizontal>Game:</Divider>
      <Header as="h1" textAlign="center" style={{ color: "#4CB393" }}>
        {props.gameAddress}
      </Header>
      <Segment placeholder>
        <Grid columns={2} stackable textAlign="center">
          <Divider vertical>And</Divider>

          <Section
            header="Odd Bettors"
            icon={<FaDiceThree style={{ fontSize: "50px" }} />}
            footer={`${props.oddBettors} Players`}
          />

          <Section
            header="Even Bettors"
            icon={<FaDiceSix style={{ fontSize: "50px" }} />}
            footer={`${props.evenBettors} Players`}
          />
        </Grid>
      </Segment>
    </div>
  );
};

export default SplitSection;
