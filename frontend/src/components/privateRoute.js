import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import auth0Client from '../Auth';

function PrivateRoute(props) {
    const {component: Component, path, checkingSession} = props;
    return (
      <Route path={path} render={() => {
        if (checkingSession) return <h3 className="text-center">Validating session...</h3>;
        if (!auth0Client.isAuthenticated()) {
          auth0Client.signIn();
          return <div>Hola</div>;
        }
        return <Component />
      }} />
    );
}   
export default PrivateRoute;