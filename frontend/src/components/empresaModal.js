import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
import axios from 'axios';

class EmpresaModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            empresa:{
                nombre: "",
                ciut: "",
                locales: [],
            },
            usuario: props.usuario,
            modal: true
        };
        this.toggle = this.toggle.bind(this);
        this.agregarEmpresa = this.agregarEmpresa.bind(this);
    }

    toggle(){
        this.setState({modal: !this.state.modal})
        this.props.handlerClick();
    }

    agregarEmpresa(){
        axios.post(process.env.REACT_APP_URLDATABASE+'/usuario/'+ this.state.usuario._id +'/empresa', this.state.empresa)
        .then(this.props.consultarEmpresa())
        .then(this.toggle());
    }

    render(){
        return(
            <div>
                <Modal isOpen={this.state.modal}>
                    <ModalHeader className="bg-teal-500">Nueva empresa</ModalHeader>
                    <ModalBody className="bg-teal-500">
                        <Label for="Nombre">Nombre: </Label>
                        <Input id="nombre" value={this.state.empresa.nombre} onChange={(event) =>  {
                            let { empresa } = this.state;
                            empresa.nombre = event.target.value;
                            this.setState({empresa})
                        }}/>
                        <Label for="Nombre">CUIT: </Label>
                        <Input id="nombre" value={this.state.empresa.cuit} onChange={(event) =>  {
                            let { empresa } = this.state;
                            empresa.cuit = event.target.value;
                            this.setState({empresa})
                        }}/>
                    </ModalBody>
                    <ModalFooter className="bg-teal-500">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" onClick={this.agregarEmpresa}>Agregar</button>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full" onClick={this.toggle}>Cancel</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default EmpresaModal;