import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
import axios from 'axios';

class LocalModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            local:{
                nombre: "",
                direccion: "",
                mail: "",
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
        console.log('http://localhost:8080/empresa/'+ this.state.empresa._id +'/local');
        this.setState({modal: !this.state.modal})
        this.props.handlerClick();
    }

    agregarLocal(){
        axios.post('http://localhost:8080/empresa/'+ this.state.empresa._id +'/local', this.state.local)
        .then((res) => {this.props.agregar(res.data)})
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
                        <Label for="Nombre">Dirección: </Label>
                        <Input id="nombre" value={this.state.local.direccion} onChange={(event) =>  {
                            let { local } = this.state;
                            local.direccion = event.target.value;
                            this.setState({local})
                        }}/>
                        <Label for="Nombre">Mail: </Label>
                        <Input id="nombre" value={this.state.local.mail} onChange={(event) =>  {
                            let { local } = this.state;
                            local.mail = event.target.value;
                            this.setState({local})
                        }}/>
                    </ModalBody>
                    <ModalFooter className="bg-teal-500">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" onClick={this.agregarLocal}>Agregar</button>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full" onClick={this.toggle}>Cancel</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default LocalModal;