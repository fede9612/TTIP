import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
import axios from 'axios';

class CategoriaModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            categoria: "",
            empresa: props.empresa,
            modal: true
        };
        this.toggle = this.toggle.bind(this);
        this.agregarCategoria = this.agregarCategoria.bind(this);
    }

    toggle(){
        this.setState({modal: !this.state.modal})
        this.props.handlerClick();
    }

    agregarCategoria(){
        axios.post(process.env.REACT_APP_URLDATABASE+'/empresa/'+ this.state.empresa._id +'/categoria', {categoria: this.state.categoria})
        .then((res) => {this.props.agregar(res.data)})
        .then(this.toggle());
    }

    render(){
        return(
            <div>
                <Modal isOpen={this.state.modal}>
                    <ModalHeader className="bg-teal-500">Nueva categoría</ModalHeader>
                    <ModalBody className="bg-teal-500">
                        <Label for="Nombre">Nombre de categoría: </Label>
                        <Input id="nombre" autoComplete="off" value={this.state.categoria} onChange={(event) =>  {
                            this.setState({categoria: event.target.value})
                        }}/>
                    </ModalBody>
                    <ModalFooter className="bg-teal-500">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" onClick={this.agregarCategoria}>Agregar</button>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full" onClick={this.toggle}>Cancel</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default CategoriaModal;