import React, { Component } from 'react';
import './styles/app.css';
import Navegacion from './components/navegacion';
import { withRouter } from "react-router-dom";

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
