import React, { Component } from "react";
import axios from 'axios';
import auth0Client from '../Auth';

class ProductoRowBuscarProductos extends Component{

    constructor(props){
        super(props);
        this.state = {
            producto : props.producto
        };
        this.agregarProductoAlCarrito = this.agregarProductoAlCarrito.bind(this);
    }

    agregarProductoAlCarrito(){
        axios.post(process.env.REACT_APP_URLDATABASE+'/usuario/' + this.state.producto.local._id + '/' + auth0Client.getProfile().nickname + '/pedido', this.state.producto);
    }

    render(){
        return(
                <div className="mt-2">
                <div className="border-r border-b border-l border-t border-gray-700 lg:border-t lg:border-gray-700 rounded-b lg:rounded-b-none lg:rounded-r p-2 flex flex-col justify-between leading-normal">
                  <div>
                    <p className="text-sm text-gray-600 flex items-center">
                      <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                      </svg>
                      Producto
                    </p>
                    <div className="text-gray-900 font-bold text-xl mb-2">{this.props.producto.nombre}</div>
                  </div>
                    <spam className="text-gray-700 text-base">Precio: <spam>{this.props.producto.precio}</spam></spam>
                    <spam className="text-gray-700 text-base">Cantidad: <spam>{this.props.producto.cantidad}</spam></spam>
                  <div className="flex items-center">
                    
                    <div className="text-xs">
                    <spam className="text-gray-600">Empresa: {this.props.producto.local.nombre} </spam>
                      <br></br>
                      
                      <spam className="text-green-700">Distancia: {this.props.calculateDistance(this.props.producto.local.latitud, this.props.producto.local.longitud)} KM</spam>
                      <button className="bg-red-600 hover:bg-red-900 text-white font-bold px-2 h-7 rounded-full"onClick={this.agregarProductoAlCarrito}>Agregar al carrito</button>
                    </div>
                  </div>
                </div>
              </div>
        )
    }
}

export default ProductoRowBuscarProductos;