import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, withRouter} from 'react-router-dom';
import BuscarProductos from './buscarproductos';
import EmpresaPanel from './empresaPanel';
import ProductosPanel from './productosPanel';
import CarritoEmpresaPanel from './carritoEmpresaPanel';
import { useAuth0 } from '../react-auth0-spa';
import PrivateRoute from './privateRoute';

class Navegacion extends Component {
    constructor(props){
        super(props);
        this.state = {
            menuModal : false
        }
    }

    toggleMenu(){
        this.setState({menuModal: !this.state.menuModal});
    }

    render(){
        return(
            <Router>
                <div>    
                    <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-1">
                    <div class="flex items-center flex-shrink-0 text-white mr-6">
                        <svg class="fill-current h-8 w-8 mr-2" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
                        <span class="font-semibold text-xl tracking-tight">Anydirec</span>
                    </div>
                    <div class="block lg:hidden">
                        <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
                                onClick={this.toggleMenu.bind(this)}
                        >
                        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                        </button>
                    </div>
                    <div class={this.state.menuModal ? "w-full block flex-grow lg:flex lg:items-center lg:w-auto" : "hidden w-full block flex-grow lg:flex lg:items-center lg:w-auto"}>
                        <div class="text-sm lg:flex-grow">
                        <Link to="/buscarproductos" onClick={this.toggleMenu.bind(this)} class="block lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                            Buscar productos
                        </Link>
                        <Link to="/empresaPanel" onClick={this.toggleMenu.bind(this)} class="block lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                            Empresa
                        </Link>
                        <a href="#responsive-header" class="block lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                            Carrito
                        </a>
                        </div>
                        <div>
                         <Login />
                        </div>
                    </div>
                    </nav>
                    <Switch>
                        <Route path="/buscarproductos">
                            <BuscarProductos />
                        </Route>
                        <Route path="/productos/:id" component={ProductosPanel}/>
                        <Route path="/pedidos/:id" component={CarritoEmpresaPanel}/>
                        <PrivateRoute path="/empresaPanel" component={EmpresaPanel}/>
                    </Switch>
                </div>
            </Router>
        )
        }
}

function Login() {

    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
    let usuarioNotUndifined;
     if(typeof user !== 'undefined'){
       usuarioNotUndifined = isAuthenticated && 
                            <div className="flex inline-flex">
                            {/* <label className="mr-2 text-white">{auth0Client.getProfile().name}</label> */}
                            {console.log(user)}
                            <span className="mr-1 text-white">{user.given_name} 
                            </span>
                            <img src={user.picture} className=" h-8 rounded-full" />
                            <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-green-400 lg:mt-0" 
                            onClick={() => logout()}>Desconectar</button>
                            </div>
    }

    return (
      <div>
       {
                            !isAuthenticated && (
                        <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-green-400 lg:mt-0"
                                onClick={() => loginWithRedirect({})}>
                                    Iniciar sesión
                        </button>
                        )}
                        {usuarioNotUndifined}  
      </div>
    );
  }

export default Navegacion;