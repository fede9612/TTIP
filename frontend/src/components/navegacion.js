import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, withRouter} from 'react-router-dom';
import BuscarProductos from './buscarproductos';
import EmpresaPanel from './empresaPanel/empresaPanel';
import auth0Client from '../Auth';
import PrivateRoute from './privateRoute';
import CarritoUsuarioPanel from './carritoUsuarioPanel';
import AuthMercadopago from './mercadopago/authMercadopago';
import ConfirmacionCompraPlan from './empresaPanel/planes/confirmacionCompraPlan';

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
                    <div class="flex items-center flex-shrink-0 text-white m-2">
                        <svg class="fill-current h-8 w-8 mr-2" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
                        <span class="font-semibold text-xl tracking-tight">Anydirec</span>
                    </div>
                    <div class="block lg:hidden">
                        <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
                                onClick={this.toggleMenu.bind(this)}
                        >
                        <svg class="fill-current h-5 w-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                        </button>
                    </div>
                    <div class={this.state.menuModal ? "w-full block flex-grow lg:flex lg:w-auto mt-1 ml-2" : "hidden lg:text-left w-full flex-grow lg:flex lg:w-auto mt-1 ml-2"}>
                        <div class="text-sm lg:flex-grow mt-1">
                        <Link to="/buscarproductos" onClick={this.toggleMenu.bind(this)} class="block text-xl lg:text-lg lg:inline-block lg:mt-0 text-teal-100 hover:text-white mr-3">
                            <button>
                                Buscar productos
                            </button>
                        </Link>
                        <Link to="/empresaPanel" onClick={this.toggleMenu.bind(this)} class="block text-xl lg:text-lg lg:inline-block lg:mt-0 text-teal-100 hover:text-white mr-3">
                            <button>
                                Empresa
                            </button>
                        </Link>
                        <Link to="/carritos" class="block text-xl lg:text-lg lg:inline-block lg:mt-0 text-teal-100 hover:text-white">
                            <button>
                                Carrito
                            </button>
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
                        <PrivateRoute urlRedirect={`${process.env.REACT_APP_URL}`} path="/empresaPanel" component={EmpresaPanel} checkingSession={this.state.checkingSession}/>
                        <PrivateRoute urlRedirect={`${process.env.REACT_APP_URL}`} path="/carritos" component={CarritoUsuarioPanel}/>
                        <Route path="/autorizado" component={AuthMercadopago}/>
                        <Route path="/confirmacionPlan" component={ConfirmacionCompraPlan}/>
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
            <button className="inline-block text-base px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-green-400 lg:mt-0"
                onClick={() => auth0Client.signIn(`${process.env.REACT_APP_URL}`)}>
                Iniciar sesión
            </button>
        )}
        {auth0Client.isAuthenticated() && 
                            <div>
                            <span className="mr-1 text-white text-xl">{auth0Client.getProfile().given_name} 
                            </span>
                            <img src={auth0Client.getProfile().picture} className="inline-block h-8 rounded-full mr-2" />
                            <button className="inline-block text-base px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-green-400 lg:mt-0" 
                            onClick={() => {signOut()}}>Desconectar</button>
                            </div>  
        }
      </div>
    );
  }

export default withRouter(Navegacion);