import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, withRouter} from 'react-router-dom';
import BuscarProductos from './buscarproductos';
import EmpresaPanel from './empresaPanel';
import ProductosPanel from './productosPanel';
import CarritoEmpresaPanel from './carritoEmpresaPanel';
import auth0Client from '../Auth';
import PrivateRoute from './privateRoute';
import CarritoUsuarioPanel from './carritoUsuarioPanel';
import ChatPedido from './chatPedido';
import EmpresaPage from './empresaPage';

class NavegacionEmpresa extends Component {
    constructor(props){
        super(props);
        this.state = {
            menuModal : false,
            checkingSession: true
        }
        this.toggleMenu = this.toggleMenu.bind(this);
        console.log(this.props.urlHome)
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
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                        <div class="container">
                        <a class="navbar-brand" href="#">Start Bootstrap</a>
                        <button class="navbar-toggler" onClick={this.toggleMenu} type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div className={(this.state.menuModal ? '' : 'collapse') + ' navbar-collapse'} id="navbarResponsive">
                            <ul class="navbar-nav ml-auto">
                            <li class="nav-item active">
                                <Link to={this.props.urlHome} class="nav-link" href="#">Home
                                <span class="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Carrito</a>
                            </li>
                            </ul>
                        </div>
                        </div>
                    </nav>
                    <Switch>
                        <PrivateRoute path="/carritos" component={CarritoUsuarioPanel}/>
                        <Route path="/empresa/:id" component={EmpresaPage}/>
                        <Route path="/chat" component={ChatPedido}/>
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
                onClick={auth0Client.signIn}>
                Iniciar sesión
            </button>
        )}
        {auth0Client.isAuthenticated() && 
                            <div className="flex inline-flex">
                            {console.log(auth0Client.getProfile())}
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

export default withRouter(NavegacionEmpresa);