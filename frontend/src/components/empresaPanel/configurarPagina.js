import React, { Component } from 'react';
import axios from 'axios';
import { ListGroupItem, Input } from 'reactstrap';

class ConfigurarPagina extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            alias: props.empresa.alias
        }
        this.confirmarAlias = this.confirmarAlias.bind(this);
    }

    confirmarAlias(){
        axios.put(process.env.REACT_APP_URLDATABASE+"/empresa/"+this.props.empresa._id+"/alias", {alias: this.state.alias})
        .then((res) => console.log(res.data))
        .catch((error) => console.log(error.response.status))
    }

    render() {
        return (
            <div>
                <h4>Página web</h4>
                <hr className="mt-2 mb-3"></hr>
                <div>
                    <ListGroupItem>
                        <span className="text-xl">Definir dominio</span>
                        <p className="p-2">
                            El dominio de su página es el nombre por el cual una persona puede encontar su página. 
                            Por favor defina un nombre con minusculas y sin espacios, ejemplo <strong>nombredepaginaweb</strong>
                        </p>                    
                        <span>{process.env.REACT_APP_URL+"empresa/"}</span>
                        <Input className="w-56 inline-block" type="text" value={this.state.alias} onChange={(event) =>  {
                            this.setState({alias: event.target.value});
                        }}/>
                        <button className="btn btn-primary ml-2" onClick={this.confirmarAlias}>Aceptar</button>
                    </ListGroupItem>
                </div>
            </div>
        );
    }
    
}

export default ConfigurarPagina;