import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import auth0Client from '../Auth';

function PrivateRoute(props) {
    const {component: Component, path, checkingSession, urlRedirect, prop} = props;
    return (
      <Route to={path} render={(props) => {
        if (checkingSession) return <h3 className="text-center">Validando sesión...</h3>;
        if (!auth0Client.isAuthenticated()) {
          console.log(urlRedirect)
          auth0Client.signIn(urlRedirect);
          return <div></div>;
        }
        return <Component {...props} id={prop}/>
      }} />
    );
}   
export default PrivateRoute;