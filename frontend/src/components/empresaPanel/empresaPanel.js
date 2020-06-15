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

class EmpresaPanel extends Component{

    constructor(props){
        super(props);
        this.state = { 
            empresa: false,
            usuario: false,
            empresaModal: false
        };
        this.handlerEmpresaModal = this.handlerEmpresaModal.bind(this);
        this.consultarEmpresa = this.consultarEmpresa.bind(this);
    }

    componentDidMount(){
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
            axios.get('http://localhost:8080/usuario/' + res.data._id + '/empresa')
            .then((res) => {
                this.setState({empresa : res.data});
            }) 
        });
    }
    
    render(){
        let empresaModal;
        if(this.state.empresaModal){
            empresaModal = <EmpresaModal handlerClick={this.handlerEmpresaModal} consultarEmpresa={this.consultarEmpresa} usuario={this.state.usuario}/>     
        }
        let infoEmpresa = (
                            <div className="w-4/5">
                                <p>{ this.state.empresa.nombre }</p>
                                <div className="mt-1">
                                    <li class="list-group-item"><Link to={"/empresaPanel/sucursales/"+this.state.empresa._id}>Sucursales</Link><br/></li>
                                    <li class="list-group-item"><Link to={"/empresaPanel/categorias"}>Categorizar productos</Link><br/></li>
                                    <li class="list-group-item"><Link to={"/empresa/"+this.state.empresa._id}>Ver página</Link><br/></li>
                                    <li class="list-group-item"><Link to={"/empresaPanel/mercadopago"}>Mercadopago</Link></li>
                                </div>
                            </div>
                          );
        if(this.state.empresa == false){
            infoEmpresa = (
                <div>
                    <p>Antes de crear una sucuarsal cree una empresa</p>
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
                            <Route path="/empresaPanel/categorias" render={(props) => <Categorias {...props} empresa={this.state.empresa}/>}/>
                            {/* estes ejemplo pierde los props pero busco la empresa por id */}
                            <Route path="/empresaPanel/sucursales/:id" render={(props) => <Sucursales {...props} empresa={this.state.empresa}/>}/>
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