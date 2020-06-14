import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import LocalRow from '../localRow';
import LocalModal from '../localModal';
import auth0Client from '../../Auth';
import EmpresaModal from '../empresaModal';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Sucursales from './sucursales';
import EmpresaPage from '../empresaPage';
import CarritoEmpresaPanel from '../carritoEmpresaPanel';
import ProductosPanel from '../productosPanel';

class EmpresaPanel extends Component{

    constructor(props){
        super(props);
        this.state = { 
            empresa: false,
            locales: [],
            usuario: false,
            empresaModal: false,
            redirect: false
        };
        this.handlerEmpresaModal = this.handlerEmpresaModal.bind(this);
        this.consultarEmpresa = this.consultarEmpresa.bind(this);
        this.setRedirect = this.setRedirect.bind(this);
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
                this.setState({empresa : res.data, locales: res.data.locales});
            }) 
        });
    }

    setRedirect = () => {
        this.setState({
          redirect: true
        })
    }

    redirectAuthMercadopago(url){
        if(this.state.redirect){
            return <Link component={() => { 
                    window.location.href = url; 
                    return null;
                }}/>
        }
    }

    
    render(){
        let empresaModal;
        if(this.state.empresaModal){
            empresaModal = <EmpresaModal handlerClick={this.handlerEmpresaModal} consultarEmpresa={this.consultarEmpresa} usuario={this.state.usuario}/>     
        }
        let infoEmpresa = (
                            <div>
                                <p>{ this.state.empresa.nombre }</p>
                                <Link to={"/empresa/"+this.state.empresa._id}>Ver página</Link><br/>
                                <Link to={"/empresaPanel/sucursales/"+this.state.empresa._id}>Sucursales</Link><br/>
                                <Link onClick={this.setRedirect}>Configurar mercadopago</Link>
                                {this.redirectAuthMercadopago("https://auth.mercadopago.com.ar/authorization?client_id=4521684348779774&response_type=code&platform_id=mp&redirect_uri=http://localhost:3000/autorizado")}
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
                            <Route path="/empresaPanel/sucursales/:id" render={(props) => <Sucursales {...props} locales={this.state.locales} empresa={this.state.empresa}/>}/>
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