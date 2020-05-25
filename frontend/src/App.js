import React, { Component } from 'react';
import './styles/app.css';
import Navegacion from './components/navegacion';
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import { Router, Route, Switch } from "react-router-dom";

const App = () => {


 

    return (
      <div className="App">
      {/* Don't forget to include the history module */}
      <Router history={history}>
        <header>
          <Navegacion />
        </header>
        <Switch>
          <Route path="/" exact />
          {/* <Route path="/profile" component={Profile} /> */}
        </Switch>
      </Router>
    </div>
    );
  
}


export default App;
