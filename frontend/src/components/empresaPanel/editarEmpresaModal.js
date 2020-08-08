import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
import axios from 'axios';

class EditarEmpresaModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            empresaEdit:{
                nombre: props.empresa.nombre
            },
            empresa: props.empresa,
            modal: true,
        };
        this.toggle = this.toggle.bind(this);
        this.editarEmpresa = this.editarEmpresa.bind(this);
    }

    toggle(){
        this.setState({modal: !this.state.modal})
        this.props.handlerClick();
    }

    editarEmpresa(){
        axios.put(process.env.REACT_APP_URLDATABASE+'/empresa/'+ this.state.empresa._id, this.state.empresaEdit)
        .then((res) => {
            this.props.consultarEmpresa();
        })
        .then(this.toggle());
    }

    render(){
        return(
            <div>
                <Modal isOpen={this.state.modal}>
                    <ModalHeader className="bg-teal-500">Editar empresa</ModalHeader>
                    <ModalBody className="bg-teal-500">
                        <Label for="Nombre">Nombre: </Label>
                        <Input id="nombre" value={this.state.empresaEdit.nombre} onChange={(event) =>  {
                            let { empresaEdit } = this.state;
                            empresaEdit.nombre = event.target.value;
                            this.setState({empresaEdit})
                        }}/>
                    </ModalBody>
                    <ModalFooter className="bg-teal-500">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" onClick={this.editarEmpresa}>Editar</button>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full" onClick={this.toggle}>Cancel</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default EditarEmpresaModal;