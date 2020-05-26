import React, { Component } from "react";
import axios from 'axios';

class ProductoRow extends Component{

    constructor(props){
        super(props);
        this.state = {
            producto : props.producto
        };
        this.handlerEstadoOcultoProducto = this.handlerEstadoOcultoProducto.bind(this);
        this.eliminarProducto = this.eliminarProducto.bind(this);
    }

    handlerEstadoOcultoProducto(){
        let { producto } = this.state
        producto.oculto = !producto.oculto
        this.setState({producto: producto});
        this.actualizarProducto(producto);
    }

    actualizarProducto(producto){
        axios.put('http://localhost:8080/producto/'+ producto._id, this.state.producto);
    }

    eliminarProducto(){
        axios.delete('http://localhost:8080/local/'+ this.props.local._id + '/' + this.state.producto._id)
        .then(this.props.eliminarProducto(this.state.producto));
    }

    render(){
        let botonOcultar;
        if(this.state.producto.oculto){
            botonOcultar = <button className="bg-gray-600 hover:bg-gray-800 text-white font-bold px-2 h-7 rounded-full" onClick={this.handlerEstadoOcultoProducto}>Mostrar</button>
        }else{
            botonOcultar = <button className="bg-gray-600 hover:bg-gray-800 text-white font-bold px-2 h-7 rounded-full" onClick={this.handlerEstadoOcultoProducto}>Ocultar</button>
        }
        return(
            <div className="mt-2 mr-2 border-r border-b border-l border-t border-gray-500 rounded-t rounded-b">
                <div className="thumbnail mt-2 mr-2 ml-2">
                    <img src="..." alt="..." className="h-40 w-40"/>
                    
                    <h5>{this.state.producto.nombre}</h5>
                    <p>${this.state.producto.precio}<span> stock: {this.state.producto.cantidad}</span></p>
                    <p className="mb-1">
                        <button className="bg-red-600 hover:bg-red-900 text-white font-bold px-2 h-7 rounded-full" onClick={this.eliminarProducto}>Eliminar</button><span> </span> 
                        {botonOcultar}
                    </p>
                </div>                
            </div>
        )
    }
}

export default ProductoRow;