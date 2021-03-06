import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, withRouter} from 'react-router-dom';
import io from "socket.io-client";
import {socket} from './notificacion/notificacion';
import axios from 'axios';
import BuscarProductos from './buscarproductos';
import EmpresaPanel from './empresaPanel/empresaPanel';
import auth0Client from '../Auth';
import PrivateRoute from './privateRoute';
import CarritoUsuarioPanel from './carritoUsuarioPanel';
import AuthMercadopago from './mercadopago/authMercadopago';
import ConfirmacionCompraPlan from './empresaPanel/planes/confirmacionCompraPlan';
import HomePage from './empresaPage/homePage';
import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import Guia from './empresaPanel/guia';

class Navegacion extends Component {
    constructor(props){
        super(props);
        this.state = {
            menuModal : false,
            notificacionToggle: false,
            checkingSession: true,
            notificaciones: []
        }
        this.toggleNotificacion = this.toggleNotificacion.bind(this);
        this.eliminarNotificacion = this.eliminarNotificacion.bind(this);
    }

    toggleMenu(){
        this.setState({menuModal: !this.state.menuModal});
    }

    toggleNotificacion(){
        this.setState({notificacionToggle: !this.state.notificacionToggle});
    }

    eliminarNotificacion(notificacion){
        axios.delete(process.env.REACT_APP_URL_CHAT+'/notificacion/'+notificacion._id)
        .then((res) => {
            socket.emit('connectionNotification', {nickname: auth0Client.getProfile().nickname});
            socket.on('notification', data => {this.setState({notificaciones: data})});
        });
    }

    async componentDidMount() {
    if (this.props.location.pathname === '/empresaPanel') {
        this.setState({checkingSession:false});
        return;
    }
    try {
        await auth0Client.silentAuth();
        this.forceUpdate();
        socket.emit('connectionNotification', {nickname: auth0Client.getProfile().nickname});
        socket.on('notification', data => {
            this.leerNotificacionSiEsParaElUsuario(data, auth0Client.getProfile().nickname);
        });
    } catch (err) {
        if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({checkingSession:false});
    }

    leerNotificacionSiEsParaElUsuario(data, usuario){
        data.map((notificacion) => {
            if(notificacion.nickname == usuario){
                var {notificaciones} = this.state;
                notificaciones.push(notificacion)
                this.setState({notificaciones: notificaciones});
            }

        })
    }

    render(){
        return(
            <Router>
                <div>    
                    <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-1">
                    <div class="flex items-center flex-shrink-0 text-white m-2">
                        <strong class="font-semibold mr-2 text-justify text-xl border-t border-b border-white">WL</strong> 
                        <span class="font-semibold text-xl tracking-tight">WebLocales</span>
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
                        <Link to="/" onClick={this.toggleMenu.bind(this)} class="block text-xl lg:text-lg lg:inline-block lg:mt-0 text-teal-100 hover:text-white mr-3">
                            <button>
                                Home
                            </button>
                        </Link>
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
                        <Link to="/carritos" class="block text-xl lg:text-lg lg:inline-block lg:mt-0 text-teal-100 hover:text-white mr-3">
                            <button>
                                Carrito
                            </button>
                        </Link>
                        <Link to="/guia" class="block text-xl lg:text-lg lg:inline-block lg:mt-0 text-teal-100 hover:text-white">
                            <button>
                                Guía
                            </button>
                        </Link>
                        </div>
                        <div>
                            <Login 
                                notificaciones={this.state.notificaciones}
                                notificacionToggle={this.state.notificacionToggle}
                                toggleNotificacion={this.toggleNotificacion}
                                eliminarNotificacion={this.eliminarNotificacion}
                            />
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
                        <Route path="/guia" component={Guia}/>
                        <Route path="/" component={HomePage}/>
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
    
    var notificacionesList;
    notificacionesList = props.notificaciones.map((notificacion) => {
        return <div className="hover:bg-gray-200">
                <button className="-mb-2 float-right" onClick={() => props.eliminarNotificacion(notificacion)}>
                    <svg width="2em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </button>
                <span className="dropdown-item">{notificacion.contenido}</span>
            </div>
    });
    
    var iconNotificacion;
    if(props.notificaciones.length){
        iconNotificacion = <div className="flex">
                                <svg width="1em" height="1em" color="red" viewBox="0 0 16 16" class="bi bi-bell-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                                </svg>
                                <span className="text-xs text-black -mt-2">{props.notificaciones.length}</span>
                            </div>
    }else{
        iconNotificacion = <svg width="1em" height="1em" color="white" viewBox="0 0 16 16" class="bi bi-bell" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2z"/>
                                <path fill-rule="evenodd" d="M8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                            </svg> 
    }

    const notificaciones = <div>
        <Dropdown isOpen={props.notificacionToggle} toggle={props.toggleNotificacion}>
        <DropdownToggle color="red" caret className="flex">
            {iconNotificacion}
        </DropdownToggle>
        <DropdownMenu right className="overflow-auto">
            {notificacionesList}
        </DropdownMenu>
        </Dropdown>    
    </div>

    return (
      <div>
       {!auth0Client.isAuthenticated() && (
            <button className="inline-block text-base px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-green-400 lg:mt-0"
                onClick={() => auth0Client.signIn(`${process.env.REACT_APP_URL}`)}>
                Iniciar sesión
            </button>
        )}
        {auth0Client.isAuthenticated() && 
            <div className="flex">
                {notificaciones}
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