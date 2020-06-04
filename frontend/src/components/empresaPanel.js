import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import LocalRow from './localRow';
import LocalModal from './localModal';
import auth0Client from '../Auth';
import EmpresaModal from './empresaModal';
import { Link } from 'react-router-dom';

class EmpresaPanel extends Component{

    constructor(props){
        super(props);
        this.state = { 
            empresa: false,
            locales: [],
            usuario: false,
            localModal: false,
            empresaModal: false
        };
        this.handlerLocalModal = this.handlerLocalModal.bind(this);
        this.handlerEmpresaModal = this.handlerEmpresaModal.bind(this);
        this.agregarLocal = this.agregarLocal.bind(this);
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
            this.setState({usuario:res.data})
            axios.get('http://localhost:8080/usuario/' + res.data._id + '/empresa')
            .then((res) => {
                this.setState({empresa : res.data, locales: res.data.locales});
            }) 
        });
    }

    agregarLocal(local){
        let {locales} = this.state;
        locales.push(local);
        console.log(local);
        this.setState({locales: locales})
    }

    
    render(){
        let localesList = <p>No tiene locales registrados aún</p>
        if(Array.isArray(this.state.locales) && this.state.locales.length){
            localesList = this.state.locales.map((local) => {
                            return(
                                <LocalRow local={local} />
                            );
                        });
        }
        let localModal;
        if(this.state.localModal){
             localModal = <LocalModal handlerClick={this.handlerLocalModal} agregar={this.agregarLocal} empresa={this.state.empresa}/>     
        }
        let empresaModal;
        if(this.state.empresaModal){
            empresaModal = <EmpresaModal handlerClick={this.handlerEmpresaModal} consultarEmpresa={this.consultarEmpresa} usuario={this.state.usuario}/>     
        }
        let infoEmpresa = (
                            <div>
                                <p>{ this.state.empresa.nombre }</p>
                                <Link to={"/empresa/"+this.state.empresa._id}>Ver página</Link>
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
            <div className="container mt-2">
                <div class="flex flex-wrap">
                    <div class="w-full lg:w-1/4">
                        <h4>Empresa</h4>
                        <hr className="w-4/5 mt-2 mb-2"></hr>
                        {infoEmpresa}
                    </div>
                    <div class="w-full lg:w-3/4">
                        <div className="flex">
                            <h4>Sucursales</h4>
                            <button className= {this.state.empresa == false ? "hidden bg-green-500 hover:bg-green-700 text-white font-bold px-2 ml-2 h-7 border-b-4 border-l-4 border-t-4 border-r-4 rounded-full"
                                    : "bg-green-500 hover:bg-green-700 text-white font-bold px-2 ml-2 h-7 border-b-4 border-l-4 border-t-4 border-r-4 rounded-full"}
                                    onClick={this.handlerLocalModal}>
                                Agregar                
                            </button>
                        </div>
                        <div className="flex">
                            {localModal}
                        </div>
                        <hr className="w-4/5 mt-1"></hr>
                        {localesList}
                    </div>
                </div>    
             
            </div>        
        )
    }
}

export default EmpresaPanel;