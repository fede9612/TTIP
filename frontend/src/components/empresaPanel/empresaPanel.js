import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import auth0Client from '../../Auth';
import EmpresaModal from '../empresaModal';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Sucursales from './sucursales';
import EmpresaPage from '../empresaPage';
import CarritoEmpresaPanel from '../carritoEmpresaPanel';
import ProductosPanel from '../productosPanel';
import Categorias from './categorias';
import VendedorMercadopago from './vendedorMercadopago';
import PlanesDePagos from './planes/planesDePagos';
import CargandoInformacion from '../cargandoInfo';
import { ListGroupItem } from 'reactstrap';
import SucursalesProductos from './productos/sucursalesProductos';
import ConfigurarPagina from './configurarPagina';
import EditarEmpresaModal from './editarEmpresaModal';

class EmpresaPanel extends Component{

    constructor(props){
        super(props);
        this.state = { 
            empresa: false,
            usuario: false,
            panel: false,
            diasDeSuscripcion: 0,
            vendedorMercadopagoSuscripto: false,
            editarEmpresaModal: false
        };
        this.consultarEmpresa = this.consultarEmpresa.bind(this);
    }

    componentDidMount(){
        this.cargando();
        this.consultarEmpresa();
        this.verificarVendedor();
    }

    handlerLocalModal(){
        this.setState({localModal: !this.state.localModal});
    }

    consultarEmpresa(){
        // Acá tengo que pasar el usuario una vez que tenga el login
        axios.get(process.env.REACT_APP_URLDATABASE+'/usuario/' + auth0Client.getProfile().nickname)
        .then((res) => {
            console.log("Entro en el server")
            this.setState({usuario:res.data});
            axios.get(process.env.REACT_APP_URLDATABASE+'/pago/' + res.data._id)
            .then((res) => {
                this.setState({diasDeSuscripcion: 30 - res.data})
                axios.get(process.env.REACT_APP_URLDATABASE+'/usuario/' + this.state.usuario._id + '/empresa')
                .then((res) => {
                    this.setState({empresa : res.data});
                    this.cargarPanel();
                }) 
            })
        });
    }
    
    verificarVendedor(){
        axios.get(process.env.REACT_APP_URLDATABASE+'/mercadopago/'+auth0Client.getProfile().nickname)
        .then((res) => {
            if(res.status == 200){
                this.setState({vendedorMercadopagoSuscripto: true});
            }
        })
        .catch((error) => {
            if(error.response.status==400){
                this.setState({vendedorMercadopagoSuscripto: false});
            }
        });
    }

    cargando(){
        var panel = (
           <CargandoInformacion/>
        )
        this.setState({panel: panel});
    }

    cargarPanel(){
        var panel;
        if(this.state.usuario.habilitado){
            panel = <EmpresaHabilitada 
                        consultarEmpresa={this.consultarEmpresa} usuario={this.state.usuario} 
                        empresa={this.state.empresa} diasDeSuscripcion={this.state.diasDeSuscripcion}
                        paginaHabilitada={this.state.vendedorMercadopagoSuscripto}
                    />
        }else{
            panel = <PlanesDePagos usuario={this.state.usuario} consultarEmpresa={this.consultarEmpresa} diasPendientes={this.state.diasDeSuscripcion}/>
        }
        this.setState({panel: panel});
    }

    render(){
        
        return(
            <div>
                {this.state.panel}
            </div>
        )
    }
}

class EmpresaHabilitada extends Component{
    
    constructor(props){
        super(props);
        this.state = {empresaModal: false, editarEmpresaModal: false}
        this.handlerEmpresaModal = this.handlerEmpresaModal.bind(this);
        this.handlerEditarEmpresaModal = this.handlerEditarEmpresaModal.bind(this);
    }

    handlerEmpresaModal(){
        this.setState({empresaModal: !this.state.empresaModal})
    }

    handlerEditarEmpresaModal(){
        this.setState({editarEmpresaModal: !this.state.editarEmpresaModal});
    }

    render(){
        let empresaModal;
        let mensajeDiasDeSuscripcion = <span>{this.props.diasDeSuscripcion} días de suscripción</span>
        if(this.props.diasDeSuscripcion <= 7){
            mensajeDiasDeSuscripcion = (<div>
                                            <p>
                                                Usted cuenta con {this.props.diasDeSuscripcion} días de suscripción, 
                                                renueva su suscripción <strong className="text-black"><Link to="/empresaPanel/planes">aquí</Link></strong>. 
                                            </p>
                                            <span>
                                                Los días restantes se sumaran a la nueva suscripción.
                                            </span>
                                        </div>)
        }
        if(this.state.empresaModal){
            empresaModal = <EmpresaModal handlerClick={this.handlerEmpresaModal} consultarEmpresa={this.props.consultarEmpresa}/>     
        }
        let editarEmpresaModal;
        if(this.state.editarEmpresaModal){
                editarEmpresaModal = <EditarEmpresaModal handlerClick={this.handlerEditarEmpresaModal} empresa={this.props.empresa} consultarEmpresa={this.props.consultarEmpresa}/>     
        }
        let infoEmpresa = (
                            <div className="w-full sm:w-4/5 md:w-11/12">
                                <div className="flex">
                                    <p className="text-lg mr-1">{ this.props.empresa.nombre }</p>
                                    <button onClick={this.handlerEditarEmpresaModal}>
                                        <svg viewBox="0 0 16 16" class="bi bi-pencil-square h-8 w-8 lg:h-5 lg:w-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </button>
                                    {editarEmpresaModal}
                                </div>
                                <div className="mt-1">
                                    <ListGroupItem>
                                        <Link to={"/empresaPanel/sucursales/"+this.props.empresa._id}>
                                            <button className="btn hover:bg-gray-400 w-full text-lg">Sucursales</button>
                                        </Link>
                                        <br/>
                                        <div className="flex justify-center -mt-1 mb-2">
                                            <hr className="w-9/12" color="#00BFA6"></hr>
                                        </div>
                                        
                                        <Link to={"/empresaPanel/categorias"}>
                                            <button className="btn hover:bg-gray-400 w-full text-lg">Categorizar productos</button>
                                        </Link>
                                        <br/>
                                        <div className="flex justify-center -mt-1 mb-2">
                                            <hr className="w-9/12" color="#00BFA6"></hr>
                                        </div>
                                        
                                        <Link to={"/empresaPanel/sucursalProductos"}>
                                            <button className="btn hover:bg-gray-400 w-full text-lg">Productos</button>
                                        </Link>
                                        <br/>
                                        <div className="flex justify-center -mt-1 mb-2">
                                            <hr className="w-9/12" color="#00BFA6"></hr>
                                        </div>
                                        
                                        <Link to={"/empresaPanel/pagina"}>
                                            <button className="btn hover:bg-gray-400 w-full text-lg">Página web</button>
                                        </Link>
                                        <br/>
                                        <div className="flex justify-center -mt-1 mb-2">
                                            <hr className="w-9/12" color="#00BFA6"></hr>
                                        </div>
                                        
                                        <Link to={"/empresaPanel/mercadopago"}>
                                            <button className="btn hover:bg-gray-400 w-full text-lg">Mercadopago</button>
                                        </Link>
                                        <div className="flex justify-center -mt-1 mb-2">
                                            <hr className="w-9/12" color="#00BFA6"></hr>
                                        </div>
                                        
                                        {(!(this.props.empresa.alias=="") && this.props.paginaHabilitada) ? <div><Link to={"/empresa/"+this.props.empresa.alias}>
                                                <button className="btn hover:bg-gray-400 w-full text-lg">Ver página</button>
                                            </Link>
                                            <br/>
                                            <div className="flex justify-center -mt-1 mb-2">
                                                <hr className="w-9/12" color="#00BFA6"></hr>
                                            </div>
                                        </div> : ""}
                                    </ListGroupItem>
                                </div>
                                <ListGroupItem className="mt-2 mb-2" color={this.props.diasDeSuscripcion <= 7 ? "danger" : "warning"}>
                                    {mensajeDiasDeSuscripcion}
                                </ListGroupItem>
                            </div>
                          );
        if(this.props.empresa == false){
            infoEmpresa = (
                <div>
                    {console.log(this.props)}
                    <p>Antes de crear una sucursales cree una empresa</p>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold px-2 ml-2 h-7 border-b-4 border-l-4 border-t-4 border-r-4 rounded-full"
                        onClick={this.handlerEmpresaModal}>
                        Agregar                
                    </button>
                    {empresaModal}
                </div>
            )
        }
        return(
            <Router>
            <div className="container mt-2 mb-4">
                <div class="flex flex-wrap">
                    <div class="w-full lg:w-1/4">
                        <h4>Empresa</h4>
                        <hr className="w-4/5 mt-2 mb-2"></hr>
                        {infoEmpresa}
                    </div>
                    <div class="w-full lg:w-3/4">
                        <Switch>
                            <Route path="/pedidos/:id" component={CarritoEmpresaPanel}/>
                            <Route path="/productos/:id" component={ProductosPanel}/>
                            <Route path="/empresaPanel/sucursalProductos" render={(props) => <SucursalesProductos {...props} empresa={this.props.empresa}/>}/>
                            <Route path="/empresaPanel/mercadopago" component={VendedorMercadopago}/>
                            {/* este ejemplo es pasando la empresa por props, tiene el problema que al recargar a página pierde los props */}
                            <Route path="/empresaPanel/categorias" render={(props) => <Categorias {...props} empresa={this.props.empresa}/>}/>
                            {/* estes ejemplo pierde los props pero busco la empresa por id */}
                            <Route path="/empresaPanel/sucursales/:id" render={(props) => <Sucursales {...props} empresa={this.props.empresa}/>}/>
                            <Route path="/empresaPanel/pagina" render={(props) => <ConfigurarPagina {...props} empresa={this.props.empresa} consultarEmpresa={this.props.consultarEmpresa}/>}/>
                            <Route path="/empresa/:alias" component={EmpresaPage}/>
                            <Route path="/empresaPanel/planes" render={(props) => <PlanesDePagos usuario={this.props.usuario} consultarEmpresa={this.props.consultarEmpresa} diasPendientes={this.props.diasDeSuscripcion}/>}/>
                        </Switch>
                    </div>
                </div>
            </div>     
            </Router>   
        )
    }
}

export default EmpresaPanel;