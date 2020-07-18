import React, { Component } from 'react';
import axios from 'axios';
import { ListGroupItem, Input, Alert } from 'reactstrap';

class ConfigurarPagina extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            alias: props.empresa.alias,
            panelInfoMostrar: false,
            panelInfo: false
        }
        this.confirmarAlias = this.confirmarAlias.bind(this);
        this.handlerPanel = this.handlerPanel.bind(this);
        this.panelInfoError = this.panelInfoError.bind(this);
        this.panelInfoSuccess = this.panelInfoSuccess.bind(this);
    }

    confirmarAlias(){
        var aliasSinEspaciosyMinuscula = this.state.alias.replace(/ /g, "").toLowerCase();
        axios.put(process.env.REACT_APP_URLDATABASE+"/empresa/"+this.props.empresa._id+"/alias", {alias: aliasSinEspaciosyMinuscula})
        .then((res) => {
            this.props.consultarEmpresa();
            this.panelInfoSuccess();
            this.handlerPanel();
        })
        .catch((error) => {
            if(error.response.status==400){
                this.panelInfoError();
                this.handlerPanel();
            }
        })
    }

    handlerPanel(){
        this.setState({panelInfoMostrar: true});
    }

    panelInfoError(){
        var panel = (
            <Alert color="danger">
                El dominio ya existe, por favor escoja otro
            </Alert>
        )
        this.setState({panelInfo: panel});
    }

    panelInfoSuccess(){
        var panel = (
            <Alert color="success">
                Guardado exitosamente
            </Alert>
        )
        this.setState({panelInfo: panel});
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
                        {this.state.panelInfoMostrar ? this.state.panelInfo : ""}
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