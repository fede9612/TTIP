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
                  <div className="inline-flex">
                    <div className="mr-2">
                      <img className="h-32 w-32 md:h-56 md:w-56" src={this.props.producto.imgUrl}></img>
                    </div>
                    <div>
                      <div>
                        <p className="text-sm text-gray-600 flex items-center">
                          Producto
                        </p>
                        <div className="text-gray-900 font-bold text-xl mb-2">{this.props.producto.nombre}</div>
                      </div>
                        <spam className="text-gray-700 text-base">Precio: <spam>{this.props.producto.precio}</spam></spam>
                        <br></br>
                        <spam className="text-gray-700 text-base">Cantidad: <spam>{this.props.producto.cantidad}</spam></spam>
                      <div className="flex items-center">
                        <div className="text-xs">
                        <spam className="text-gray-600 text-base">Empresa: {this.props.producto.local.nombre} </spam>
                          <br></br>
                          <spam className="text-green-700 text-base">Distancia: {this.props.calculateDistance(this.props.producto.local.latitud, this.props.producto.local.longitud)} KM</spam>
                          <br></br>
                          <button className="text-lg bg-red-600 hover:bg-red-900 text-white font-bold px-2 h-7 rounded-full"onClick={this.agregarProductoAlCarrito}>Agregar al carrito</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        )
    }
}

export default ProductoRowBuscarProductos;