import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import SearchGames from "./pages/SearchGames";
import SavedGames from "./pages/SavedGames";
import Navbar from "./components/Navbar";
import { PageNotFound } from "./pages/PageNotFound";
import { GameDetail } from "./pages/GameDetail";
import { Footer } from "./components/Footer";
const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div
          style={{
            paddingTop: "70px",
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Navbar />
          <div style={{ flex: "1" }}>
            <Switch>
              <Route exact path="/" component={SearchGames} />
              <Route exact path="/saved" component={SavedGames} />
              <Route path="/game/:name" component={GameDetail} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
