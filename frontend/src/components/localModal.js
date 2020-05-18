import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, FormGroup, Label } from 'reactstrap';
import axios from 'axios';

class LocalModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            local:{
                nombre: "",
                productos: [],
                carritosDePedidos: []
            },
            empresa: props.empresa,
            modal: true
        };
        this.toggle = this.toggle.bind(this);
        this.agregarLocal = this.agregarLocal.bind(this);
    }

    toggle(){
        this.setState({modal: !this.state.modal})
        this.props.handlerClick();
    }

    agregarLocal(){
        axios.post('http://localhost:8080/empresa/'+ this.state.empresa._id +'/local', this.state.local)
        .then((res) => {this.props.consultarEmpresa(res.data)})
        .then(this.toggle());
    }

    render(){
        return(
            <div>
                <Modal isOpen={this.state.modal}>
                    <ModalHeader className="bg-teal-500">Nueva sucursal</ModalHeader>
                    <ModalBody className="bg-teal-500">
                        <Label for="Nombre">Nombre: </Label>
                        <Input id="nombre" value={this.state.local.nombre} onChange={(event) =>  {
                            let { local } = this.state;
                            local.nombre = event.target.value;
                            this.setState({local})
                        }}/>
                    </ModalBody>
                    <ModalFooter className="bg-teal-500">
                    <Button color="primary" onClick={this.agregarLocal}>Agregar</Button>
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default LocalModal;