import React, { Component } from 'react';
import axios from 'axios';

class EmpresaPanel extends Component{

    constructor(props){
        super(props);
        this.state = { empresa: false };
    }

    componentDidMount(){
        this.consultarEmpresa();    
    }

    consultarEmpresa(){
        //Acá tengo que pasar el usuario una vez que tenga el login
        axios.get('http://localhost:8080/usuario/5ebb37c7fb5efb104fc5b6cb/empresa')
        .then((res) => {
          this.setState({empresa : res.data});
        });
    }
    
    render(){
        return(
            <div className="container mt-2">
                <div>
                    <h4>Empresa</h4>
                    <p>{ this.state.empresa.nombre }</p>
                </div>
            </div>        
        )
    }
}

export default EmpresaPanel;