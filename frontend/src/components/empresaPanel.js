import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import LocalRow from './localRow';

class EmpresaPanel extends Component{

    constructor(props){
        super(props);
        this.state = { 
            empresa: false,
            locales: [] 
        };
    }

    componentDidMount(){
        this.consultarEmpresa(); 
    }

    consultarEmpresa(){
        //Acá tengo que pasar el usuario una vez que tenga el login
        axios.get('http://localhost:8080/usuario/5ebb37c7fb5efb104fc5b6cb/empresa')
        .then((res) => {
          this.setState({empresa : res.data, locales: res.data.locales});
        });
    }
    
    render(){
        let localesList = this.state.locales.map((local) => {
            return(
                <LocalRow local={local} />
            );
        });

        return(
            
            <div className="container mt-2">
                <div class="flex flex-wrap">
                    <div class="w-full lg:w-1/4 ">
                        <h4>Empresa</h4>
                        <hr className="w-4/5 mt-1"></hr>
                        <p>{ this.state.empresa.nombre }</p>
                    </div>
                    <div class="w-full lg:w-3/4">
                        <h4>Sucursales</h4>
                        <hr className="w-4/5 mt-1"></hr>
                        {localesList}
                    </div>
                </div>    
             
            </div>        
        )
    }
}

export default EmpresaPanel;