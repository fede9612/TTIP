import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import LocalRow from './localRow';
import LocalModal from './localModal';

class EmpresaPanel extends Component{

    constructor(props){
        super(props);
        this.state = { 
            empresa: false,
            locales: [],
            localModal: false
        };
        this.handlerLocalModal = this.handlerLocalModal.bind(this);
        this.agregarLocal = this.agregarLocal.bind(this);
    }

    componentDidMount(){
        this.consultarEmpresa(); 
    }

    handlerLocalModal(){
        this.setState({localModal: !this.state.localModal})
    }

    consultarEmpresa(){
        //Acá tengo que pasar el usuario una vez que tenga el login
        axios.get('http://localhost:8080/usuario/5ebb37c7fb5efb104fc5b6cb/empresa')
        .then((res) => {
          this.setState({empresa : res.data, locales: res.data.locales});
        });
    }

    agregarLocal(local){
        let {locales} = this.state;
        locales.push(local);
        this.setState({locales: locales})
    }
    
    render(){
        let localesList = this.state.locales.map((local) => {
            return(
                <LocalRow local={local} />
            );
        });
        let localModal;
        if(this.state.localModal){
             localModal = <LocalModal handlerClick={this.handlerLocalModal} consultarEmpresa={this.agregarLocal} empresa={this.state.empresa}/> 
        }

        return(
            <div className="container mt-2">
                <div class="flex flex-wrap">
                    <div class="w-full lg:w-1/4 ">
                        <h4>Empresa</h4>
                        <hr className="w-4/5 mt-1"></hr>
                        <p>{ this.state.empresa.nombre }</p>
                    </div>
                    <div class="w-full lg:w-3/4">
                        <div className="flex">
                            <h4>Sucursales</h4>
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold px-2 ml-2 h-7 border-b-4 border-l-4 border-t-4 border-r-4 rounded-full"
                                    onClick={this.handlerLocalModal}>
                                Agregar                
                            {localModal}
                            </button>
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