import { Helmet } from "react-helmet";

const AppHelmet = (props) => {
    const { subTitle } = props;
    return (
        <Helmet>
            <title>OddEvenGame | {subTitle}</title>
        </Helmet>
    );
};

export default AppHelmet;
