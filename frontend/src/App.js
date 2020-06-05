import React, { Component } from 'react';
import './styles/app.css';
import Navegacion from './components/navegacion';
import { withRouter, Route, Switch } from "react-router-dom";
import EmpresaPage from '../src/components/empresaPage';

class App extends Component {
  
  render(){
    {console.log(this.props.location.pathname)}
    return (
      <div>
        <Switch>
          <Route path="/empresa/:id" component={PageEmpresa}/>
          <Route path="/" component={Navegacion}/>
        </Switch>
      </div>
    );
  }
}

const PageEmpresa = () => (
  <div>
    <Route path="/empresa/:id" component={EmpresaPage}/>
  </div>
);


export default withRouter(App);
