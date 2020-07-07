import React, { Component } from "react";
import '../index.css';
import axios from 'axios';
import EliminarModal from "./empresaPanel/eliminarModal";

class ProductoRow extends Component{

    constructor(props){
        super(props);
        this.state = {
            producto : props.producto,
            modalEliminarProducto: false
        };
        this.handlerEstadoOcultoProducto = this.handlerEstadoOcultoProducto.bind(this);
        this.handlerEliminarProductoModal = this.handlerEliminarProductoModal.bind(this);
        this.eliminarProducto = this.eliminarProducto.bind(this);
    }

    handlerEstadoOcultoProducto(){
        let { producto } = this.state
        producto.oculto = !producto.oculto
        this.setState({producto: producto});
        this.actualizarProducto(producto);
    }

    handlerEliminarProductoModal(){
        this.setState({modalEliminarProducto: !this.state.modalEliminarProducto});
    }

    actualizarProducto(producto){
        axios.put(process.env.REACT_APP_URLDATABASE+'/producto/'+ producto._id, this.state.producto);
    }

    eliminarProducto(){
        axios.delete(process.env.REACT_APP_URLDATABASE+'/local/'+ this.props.local._id + '/' + this.state.producto._id)
        .then(this.props.eliminarProducto(this.state.producto));
    }

    render(){
        let botonOcultar;
        if(this.state.producto.oculto){
            botonOcultar = <button className="bg-gray-600 hover:bg-gray-800 text-white font-bold px-2 h-7 rounded-full" onClick={this.handlerEstadoOcultoProducto}>Mostrar</button>
        }else{
            botonOcultar = <button className="bg-gray-600 hover:bg-gray-800 text-white font-bold px-2 h-7 rounded-full" onClick={this.handlerEstadoOcultoProducto}>Ocultar</button>
        }
        var eliminarProducto;
        if(this.state.modalEliminarProducto){
            eliminarProducto = <EliminarModal
                                    pregunta={`¿Eliminar el producto ${this.state.producto.nombre}?`} 
                                    changeModal={this.handlerEliminarProductoModal} 
                                    eliminarMethod={this.eliminarProducto}
                                    eliminarElement={this.state.producto}
                                />
        }
        return(
            
                <div class="card h-100 w-10/12 md:w-5/12 sm:w-10/12 lg:w-5/12 xl:w-56 xl:m-1 m-2">
                <img class="card-img-top h-auto" src={this.state.producto.imgUrl ? this.props.producto.imgUrl : "http://placehold.it/700x400"} alt=""></img>
                    <div class="card-body">
                        <h4 class="card-title mb-1">
                            {this.state.producto.nombre}
                        </h4>
                        <p>${this.state.producto.precio}<span> stock: {this.state.producto.cantidad}</span></p>
                        <hr/>
                        <p class="card-text">{this.state.producto.detalle ? this.state.producto.detalle : "Descripción" }</p>
                    </div>
                    <div class="card-footer d-flex justify-content-center">
                        <p>
                            <button className="bg-red-600 hover:bg-red-900 text-white font-bold px-2 h-7 rounded-full" onClick={this.handlerEliminarProductoModal}>Eliminar</button><span> </span> 
                            {botonOcultar}
                            {eliminarProducto}
                        </p>
                    </div>
                </div>
            
        )
    }
}

export default ProductoRow;