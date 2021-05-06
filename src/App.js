import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import Layout from "./components/Layout";
import GameList from "./pages/GameList";
import ViewGame from "./pages/ViewGame";
import CreateGame from "./pages/CreateGame";

function App() {
    return (
        <Layout>
            <Route exact path="/" component={GameList} />
            <Switch>
                <Route exact path="/newGame" component={CreateGame} />
                <Route exact path="/:addr" component={ViewGame} />
            </Switch>
        </Layout>
    );
}

export default App;
