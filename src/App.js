import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import Layout from "./components/Layout";
import GameList from "./pages/GameList";
import ViewGame from "./pages/ViewGame";

function App() {
  return (
    <Layout>
      <Route exact path="/" component={GameList} />
      <Route path="/:addr" component={ViewGame} />
    </Layout>
  );
}

export default App;
