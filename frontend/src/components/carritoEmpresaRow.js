import React, { Component } from "react";
import axios from 'axios';

class CarritoEmpresaRow extends Component{

    constructor(props){
        super(props);
        this.state = {
            pedido : props.pedido
        };
        // this.handlerEstadoOcultoProducto = this.handlerEstadoOcultoProducto.bind(this);
        // this.eliminarProducto = this.eliminarProducto.bind(this);
    }

    calcularMontoDelPedido(){
        let monto = 0;
        this.state.pedido.pedidos.map((producto) =>{
            monto += producto.precio;
        });
        return monto;
    }

    // handlerEstadoOcultoProducto(){
    //     let { producto } = this.state
    //     producto.oculto = !producto.oculto
    //     this.setState({producto: producto});
    //     this.actualizarProducto(producto);
    // }

    // actualizarProducto(producto){
    //     axios.put('http://localhost:8080/producto/'+ producto._id, this.state.producto);
    // }

    // eliminarProducto(){
    //     axios.delete('http://localhost:8080/local/'+ this.props.local._id + '/' + this.state.producto._id)
    //     .then(this.props.eliminarProducto(this.state.producto));
    // }

    render(){
        let botonPendiente;
        if(true){
            botonPendiente = <button className="bg-green-400 hover:bg-gray-800 text-white font-bold px-2 h-7 rounded-full" onClick={this.handlerEstadoOcultoProducto}>Terminar</button>
        }else{
            botonPendiente = <button className="bg-gray-600 hover:bg-gray-800 text-white font-bold px-2 h-7 rounded-full" onClick={this.handlerEstadoOcultoProducto}>Pendiente</button>
        }
        return(
            
                <tr>
                    <td>{this.state.pedido.usuarioDelPedido.mail}</td>
                    <td>{this.state.pedido.pedidos.length}</td>
                    <td>{this.calcularMontoDelPedido()}</td>
                    <td>Pendiente</td>
                    <td>{botonPendiente}</td>
                </tr>                 
            
            
        )
    }
}

export default CarritoEmpresaRow;