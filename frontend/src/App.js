import React, { Component } from 'react';
import './styles/app.css';
import Navegacion from './components/navegacion';
import auth0Client from './Auth';
import history from "./utils/history";
import { Router, Route, Switch, withRouter } from "react-router-dom";
import PrivateRoute from './components/privateRoute';
import EmpresaPanel from './components/empresaPanel';

class App extends Component {
  
  render(){
    return (
      <div>
        <Navegacion />
      </div>
    );
  }
}


export default withRouter(App);
