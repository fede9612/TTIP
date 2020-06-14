import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, withRouter} from 'react-router-dom';
import BuscarProductos from './buscarproductos';
import EmpresaPanel from './empresaPanel/empresaPanel';
import ProductosPanel from './productosPanel';
import CarritoEmpresaPanel from './carritoEmpresaPanel';
import auth0Client from '../Auth';
import PrivateRoute from './privateRoute';
import CarritoUsuarioPanel from './carritoUsuarioPanel';
import EmpresaPage from './empresaPage';
import AuthMercadopago from './mercadopago/authMercadopago';

class Navegacion extends Component {
    constructor(props){
        super(props);
        this.state = {
            menuModal : false,
            checkingSession: true
        }
    }

    toggleMenu(){
        this.setState({menuModal: !this.state.menuModal});
    }

    async componentDidMount() {
        if (this.props.location.pathname === '/empresaPanel') {
          this.setState({checkingSession:false});
          return;
        }
        try {
          await auth0Client.silentAuth();
          this.forceUpdate();
        } catch (err) {
          if (err.error !== 'login_required') console.log(err.error);
        }
        this.setState({checkingSession:false});
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
                        <Link to="/buscarproductos" onClick={this.toggleMenu.bind(this)} class="block text-base lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                            Buscar productos
                        </Link>
                        <Link to="/empresaPanel" onClick={this.toggleMenu.bind(this)} class="block text-base lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                            Empresa
                        </Link>
                        <Link to="/carritos" class="block lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                            <svg class="bi bi-cart w-5 h-6 p-0" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                            </svg>
                        </Link>
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
                        <PrivateRoute urlRedirect={"http://localhost:3000/"} path="/empresaPanel" component={EmpresaPanel} checkingSession={this.state.checkingSession}/>
                        <PrivateRoute urlRedirect={"http://localhost:3000/"} path="/carritos" component={CarritoUsuarioPanel}/>
                        <Route path="/autorizado" component={AuthMercadopago}/>
                    </Switch>
                </div>
            </Router>
        )
        }
}

function Login(props) {

    const signOut = () => {
        auth0Client.signOut();
        props.history.replace('/');
      };
    
    return (
      <div>
       {!auth0Client.isAuthenticated() && (
            <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-green-400 lg:mt-0"
                onClick={() => auth0Client.signIn("http://localhost:3000/")}>
                Iniciar sesión
            </button>
        )}
        {auth0Client.isAuthenticated() && 
                            <div className="flex inline-flex">
                            <span className="mr-1 text-white">{auth0Client.getProfile().given_name} 
                            </span>
                            <img src={auth0Client.getProfile().picture} className=" h-8 rounded-full" />
                            <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-green-400 lg:mt-0" 
                            onClick={() => {signOut()}}>Desconectar</button>
                            </div>  
        }
      </div>
    );
  }

export default withRouter(Navegacion);