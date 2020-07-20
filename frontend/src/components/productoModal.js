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
                cantidad: 0,
                detalle: "",
                categoria: "",
                image: null
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
        var formData = new FormData();
        formData.append('nombre', this.state.producto.nombre);
        formData.append('precio', this.state.producto.precio);
        formData.append('cantidad', this.state.producto.cantidad);
        formData.append('detalle', this.state.producto.detalle);
        formData.append('categoria', this.state.producto.categoria);
        formData.append('image', this.state.producto.image);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        axios.post(process.env.REACT_APP_URLDATABASE+'/local/'+ this.state.local._id +'/producto', formData, config)
        .then((res) => this.props.agregarProducto(res.data))
        .then(this.toggle());
    }

    render(){
        let categorias = <option></option>;
        if(this.state.local.empresa.categoriasDeProductos.length){
            categorias = this.state.local.empresa.categoriasDeProductos.map((categoria) =>{
                return(
                    <option>{categoria}</option>
                )
            });
        }
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
                        <Label for="Precio">Precio: </Label>
                        <Input id="precio" type="number" value={this.state.producto.precio} onChange={(event) =>  {
                            let { producto } = this.state;
                            producto.precio = event.target.value;
                            this.setState({producto})
                        }}/>
                        <Label for="Cantidad">Cantidad: </Label>
                        <Input id="cantidad" type="number" value={this.state.producto.cantidad} onChange={(event) =>  {
                            let { producto } = this.state;
                            producto.cantidad = event.target.value;
                            this.setState({producto})
                        }}/>
                        <Label for="Detalle">Detalle: </Label>
                        <Input id="Detalle" type="textarea" value={this.state.producto.detalle} onChange={(event) =>  {
                            let { producto } = this.state;
                            producto.detalle = event.target.value;
                            this.setState({producto})
                        }}/>
                        <Label for="Imagen">Imagen: </Label>
                        <Input id="Imagen" type="file" onChange={(event) =>  {
                            let { producto } = this.state;
                            producto.image = event.target.files[0];
                            this.setState({producto})
                        }}/>
                        <Label for="Categoria">Categorías: </Label>
                        <Input id="Categoria" type="select" value={this.state.producto.categoria} onChange={(event) =>  {
                            let { producto } = this.state;
                            producto.categoria = event.target.value.toString();
                            this.setState({producto})
                        }}>
                            <option>Seleccione una categoría</option>
                            {categorias}
                        </Input>
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