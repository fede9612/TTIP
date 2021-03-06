import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import auth0Client from '../Auth';
import PrivateRoute from './privateRoute';
import EmpresaPage from './empresaPage';
import CarritoEmpresaPage from './carritoEmpresaPage';
import CompraAprovada from './empresaPage/compraAprovada';
import ProductosCategorizados from './empresaPage/productosCategorizados';

class NavegacionEmpresa extends Component {
    constructor(props){
        super(props);
        this.state = {
            empresa: false,
            menuModal : false,
            checkingSession: true,
            urlHome: props.urlHome,
            redirect: false
        }
        this.toggleMenu = this.toggleMenu.bind(this);
        this.consultarEmpresa = this.consultarEmpresa.bind(this);
        console.log(this.props.urlHome)
        console.log(process.env.REACT_APP_URLDATABASE+'/empresa/' + this.props.match.params.id);
    }
    
    UNSAFE_componentWillMount(){
        this.consultarEmpresa();
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

    consultarEmpresa(){
        axios.get(`${process.env.REACT_APP_URLDATABASE}`+'/empresa/alias/'+this.props.match.params.alias)
        .then((res) => this.setState({empresa: res.data}));
    }
    
    toggleMenu(){
        this.setState({menuModal: !this.state.menuModal});
    }

    setRedirect = () => {
        this.setState({
          redirect: true
        })
    }

    redirectHome(){
        if(this.state.redirect){
            return <Link component={() => window.location.href = "/empresa/" + this.state.empresa.alias}/>
        }
    }
    
    render(){
        return(
            <Router>
                {this.redirectHome()}
                <div>    
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                        <div class="container">
                        <a class="navbar-brand" href="#"></a>
                        <button class="navbar-toggler" onClick={this.toggleMenu} type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div className={(this.state.menuModal ? '' : 'collapse') + ' navbar-collapse'} id="navbarResponsive">
                            <ul class="navbar-nav ml-auto">
                            <li class="nav-item active">
                                <button  class="nav-link" onClick={this.setRedirect}>Home
                                <span class="sr-only">(current)</span>
                                </button>
                            </li>
                            <li class="nav-item">
                                {console.log(this.state.empresa)}
                                <Link to={"/empresa/" + this.state.empresa._id + "/carrito"} class="nav-link" onClick={this.toggleMenu}>Carrito</Link>
                            </li>
                            </ul>
                        </div>
                        </div>
                    </nav>
                    <Switch>
                        <PrivateRoute urlRedirect={`${process.env.REACT_APP_URL}`+'empresa/' + this.state.empresa.alias} path="/empresa/:id/carrito" component={CarritoEmpresaPage} prop={this.state.empresa._id}/>
                        <Route path="/empresa/:alias/aprovado" component={CompraAprovada}/>
                        <Route path={"/empresa/:alias/categoria/:categoria"} component={ProductosCategorizados}/>
                        <Route path="/empresa/:alias" component={EmpresaPage}/>
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