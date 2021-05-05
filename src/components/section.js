import { Grid, Header } from 'semantic-ui-react';

const Section = (props) => {
    const { header, icon, footer, form } = props;
    return (
        <Grid.Column>
            <Header as="h2">{header}</Header>
            {icon}
            <Header as="h4" horizontal="true">
                {footer}
            </Header>
            {form}
        </Grid.Column>
    );
};

export default Section;
