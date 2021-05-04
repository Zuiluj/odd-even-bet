import { Grid, Header } from "semantic-ui-react";

const Section = (props) => {
  console.log(props);
  const { header, icon, footer } = props;
  return (
    <Grid.Column>
      <Header as="h2">{header}</Header>
      {icon}
      <Header as="h4" horizontal>
        {footer}
      </Header>
    </Grid.Column>
  );
};

export default Section;
