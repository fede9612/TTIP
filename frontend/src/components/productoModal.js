import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
import axios from 'axios';

class ProductoModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            producto:{
                nombre: "",
                precio: 0,
                cantidad: 0
            },
            local: props.local,
            modal: true
        };
        this.toggle = this.toggle.bind(this);
        this.agregarProducto = this.agregarProducto.bind(this);
    }

    toggle(){
        this.setState({modal: !this.state.modal})
        this.props.handlerClick();
    }

    agregarProducto(){
        axios.post('http://localhost:8080/local/'+ this.state.local._id +'/producto', this.state.producto)
        .then(this.props.agregarProducto(this.state.producto))
        .then(this.toggle());
    }

    render(){
        return(
            <div>
                <Modal isOpen={this.state.modal}>
                    <ModalHeader className="bg-teal-500">Nuevo Producto</ModalHeader>
                    <ModalBody className="bg-teal-500">
                        <Label for="Nombre">Nombre: </Label>
                        <Input id="nombre" value={this.state.producto.nombre} onChange={(event) =>  {
                            let { producto } = this.state;
                            producto.nombre = event.target.value;
                            this.setState({producto})
                        }}/>
                        <Label for="Nombre">Precio: </Label>
                        <Input id="nombre" value={this.state.producto.precio} onChange={(event) =>  {
                            let { producto } = this.state;
                            producto.precio = event.target.value;
                            this.setState({producto})
                        }}/>
                        <Label for="Nombre">Cantidad: </Label>
                        <Input id="nombre" value={this.state.producto.cantidad} onChange={(event) =>  {
                            let { producto } = this.state;
                            producto.cantidad = event.target.value;
                            this.setState({producto})
                        }}/>
                    </ModalBody>
                    <ModalFooter className="bg-teal-500">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" onClick={this.agregarProducto}>Agregar</button>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full" onClick={this.toggle}>Cancel</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default ProductoModal;