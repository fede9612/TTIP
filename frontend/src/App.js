import React, { Component } from 'react';
import './styles/app.css';
import Navegacion from './components/navegacion';
import { withRouter, Route, Switch } from "react-router-dom";
import NavegacionEmpresa from './components/navegacionEmpresa';

class App extends Component {
  
  render(){
    return (
      <div>
        <Switch>
          <Route path="/empresa/:alias" component={PageEmpresa}/>
          <Route path="/" component={Navegacion}/>
        </Switch>
      </div>
    );
  }
}

const PageEmpresa = () => (
  <div>
    <Route render={(props) => <NavegacionEmpresa {...props} urlHome={window.location.pathname}/>}/>
  </div>
);


export default withRouter(App);
