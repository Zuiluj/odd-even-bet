import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Header = () => {
    const navigate = (link) => {
        <Link to={link}></Link>;
    };
    return (
        <Menu pointing secondary style={{ marginTop: '10px' }}>
            <Menu.Item>
                <Link to="/">
                    <Icon name="game" />
                    Odd - Even - Bet
                </Link>
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item>
                    <Link to="/newgame">
                        {' '}
                        <Icon name="plus" />
                        New Game
                    </Link>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};

export default Header;
