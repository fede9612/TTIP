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
import PlanesDePagos from './planesDePagos';
import CargandoInformacion from '../cargandoInfo';
import { ListGroupItem } from 'reactstrap';

class EmpresaPanel extends Component{

    constructor(props){
        super(props);
        this.state = { 
            empresa: false,
            usuario: false,
            empresaModal: false,
            panel: false,
            diasDeSuscripcion: 0
        };
        this.handlerEmpresaModal = this.handlerEmpresaModal.bind(this);
        this.consultarEmpresa = this.consultarEmpresa.bind(this);
    }

    componentDidMount(){
        this.cargando();
        this.consultarEmpresa();
    }

    handlerLocalModal(){
        this.setState({localModal: !this.state.localModal})
    }

    handlerEmpresaModal(){
        this.setState({empresaModal: !this.state.empresaModal})
    }

    consultarEmpresa(){
        //Acá tengo que pasar el usuario una vez que tenga el login
        axios.get('http://localhost:8080/usuario/' + auth0Client.getProfile().nickname)
        .then((res) => {
            this.setState({usuario:res.data});
            axios.get('http://localhost:8080/pago/' + res.data._id)
            .then((res) => {
                this.setState({diasDeSuscripcion: 30 - res.data})
                axios.get('http://localhost:8080/usuario/' + this.state.usuario._id + '/empresa')
                .then((res) => {
                    this.setState({empresa : res.data});
                    this.cargarPanel();
                }) 
            })
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
                        empresaModal={this.state.empresaModal} handlerEmpresaModal={this.handlerEmpresaModal} consultarEmpresa={this.consultarEmpresa}
                        usuario={this.state.usuario} empresa={this.state.empresa} diasDeSuscripcion={this.state.diasDeSuscripcion}   
                    />
        }else{
            panel = <PlanesDePagos usuario={this.state.usuario} consultarEmpresa={this.consultarEmpresa}/>
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
    }

    render(){
        let empresaModal;
        if(this.props.empresaModal){
            empresaModal = <EmpresaModal handlerClick={this.props.handlerEmpresaModal} consultarEmpresa={this.props.consultarEmpresa} usuario={this.props.usuario}/>     
        }
        let infoEmpresa = (
                            <div className="w-4/5">
                                <p>{ this.props.empresa.nombre }</p>
                                <div className="mt-1">
                                    <ListGroupItem><Link to={"/empresaPanel/sucursales/"+this.props.empresa._id}>Sucursales</Link><br/></ListGroupItem>
                                    <ListGroupItem><Link to={"/empresaPanel/categorias"}>Categorizar productos</Link><br/></ListGroupItem>
                                    <ListGroupItem><Link to={"/empresa/"+this.props.empresa._id}>Ver página</Link><br/></ListGroupItem>
                                    <ListGroupItem><Link to={"/empresaPanel/mercadopago"}>Mercadopago</Link></ListGroupItem>
                                </div>
                                <ListGroupItem className="mt-2" color={this.props.diasDeSuscripcion <= 7 ? "danger" : "warning"}>
                                    <span>Usted cuenta con {this.props.diasDeSuscripcion} días de suscripción restantes</span>
                                </ListGroupItem>
                            </div>
                          );
        if(this.props.empresa == false){
            infoEmpresa = (
                <div>
                    <p>Antes de crear una sucuarsal cree una empresa</p>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold px-2 ml-2 h-7 border-b-4 border-l-4 border-t-4 border-r-4 rounded-full"
                        onClick={this.props.handlerEmpresaModal}>
                        Agregar                
                    </button>
                    {empresaModal}
                </div>
            )
        }
        return(
            <Router>
            <div className="container mt-2">
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
                            <Route path="/empresaPanel/mercadopago" component={VendedorMercadopago}/>
                            {/* este ejemplo es pasando la empresa por props, tiene el problema que al recargar a página pierde los props */}
                            <Route path="/empresaPanel/categorias" render={(props) => <Categorias {...props} empresa={this.props.empresa}/>}/>
                            {/* estes ejemplo pierde los props pero busco la empresa por id */}
                            <Route path="/empresaPanel/sucursales/:id" render={(props) => <Sucursales {...props} empresa={this.props.empresa}/>}/>
                            <Route path="/empresa/:id" component={EmpresaPage}/>
                        </Switch>
                    </div>
                </div>
            </div>     
            </Router>   
        )
    }
}

export default EmpresaPanel;