import React, { Component } from "react";
import '../index.css';
import axios from 'axios';
import EliminarModal from "./empresaPanel/eliminarModal";
import EditarProducto from "./empresaPanel/productos/editarProducto";

class ProductoRow extends Component{

    constructor(props){
        super(props);
        this.state = {
            producto : props.producto,
            modalEliminarProducto: false,
            modalEditarProducto: false
        };
        this.handlerEstadoOcultoProducto = this.handlerEstadoOcultoProducto.bind(this);
        this.handlerEliminarProductoModal = this.handlerEliminarProductoModal.bind(this);
        this.handlerEditarProductoModal = this.handlerEditarProductoModal.bind(this);
        this.eliminarProducto = this.eliminarProducto.bind(this);
        this.setProducto = this.setProducto.bind(this);
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

    handlerEditarProductoModal(){
        this.setState({modalEditarProducto: !this.state.modalEditarProducto});
    }

    actualizarProducto(producto){
        axios.put(process.env.REACT_APP_URLDATABASE+'/producto/'+ producto._id, this.state.producto);
    }

    eliminarProducto(){
        axios.delete(process.env.REACT_APP_URLDATABASE+'/local/'+ this.props.local._id + '/' + this.state.producto._id)
        .then(res => this.props.eliminarProducto(res.data));
    }

    setProducto(producto){
        this.setState({producto: producto});
    }

    render(){
        let botonOcultar;
        if(this.state.producto.oculto){
            botonOcultar = <button 
                                type="button" 
                                className="bg-gray-600 hover:bg-gray-800 text-white font-bold px-2 h-10 text-xl lg:h-6 lg:text-base rounded-full" 
                                data-toggle="tooltip" data-placement="bottom" title="Mostrar producto en tu página web"
                                onClick={this.handlerEstadoOcultoProducto}>
                                    <span id="TooltipMostrar">Mostrar</span>
                            </button>
        }else{
            botonOcultar = <button 
                                type="button"
                                className="bg-gray-600 hover:bg-gray-800 text-white font-bold px-2 h-10 text-xl lg:h-6 lg:text-base rounded-full" 
                                data-toggle="tooltip" data-placement="bottom" title="Ocultar producto en tu página web"
                                onClick={this.handlerEstadoOcultoProducto}>
                                    <span id="TooltipOcultar">Ocultar</span>
                            </button>
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
        var editarProducto;
        if(this.state.modalEditarProducto){
            editarProducto = <EditarProducto 
                                producto={this.state.producto} 
                                handlerClick={this.handlerEditarProductoModal} 
                                actualizarProducto={this.setProducto}
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
                    <div class="card-footer inline-flex justify-center">
                        <button className="text-gray-700 mr-3" onClick={this.handlerEliminarProductoModal}>
                            <svg viewBox="0 0 16 16" class="bi bi-trash h-8 w-8 lg:h-5 lg:w-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </button> 
                            {eliminarProducto}
                        <button className="text-gray-700 mr-3" onClick={this.handlerEditarProductoModal}>
                            <svg viewBox="0 0 16 16" class="bi bi-pencil-square h-8 w-8 lg:h-5 lg:w-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                        </button>
                            {editarProducto}
                        {botonOcultar}
                        
                        
                    </div>
                </div>
            
        )
    }
}

export default ProductoRow;