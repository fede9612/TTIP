import React, { Component } from "react";
import axios from 'axios';
import ChatPedido from "./chatPedido";
import { Link } from "react-router-dom";

class CarritoEmpresaRow extends Component{

    constructor(props){
        super(props);
        this.state = {
            pedido : props.pedido,
            local : props.local
        };
        this.actualizarEstado = this.actualizarEstado.bind(this);
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

    actualizarEstado(){
        let { pedido } = this.state;
        pedido.pendiente = !pedido.pendiente;
        this.setState({pedido: pedido});
        axios.put('http://localhost:8080/carrito/'+ pedido._id +'/local', pedido).then(this.props.actualizarPedidos(pedido));
    }
    
    render(){  
        let botonPendiente;
        if(this.state.pedido.pendiente){
            botonPendiente = <button className="bg-red-600 hover:bg-red-800 text-white font-bold px-2 h-7 rounded-full" onClick={this.actualizarEstado}>Pendiente</button>
        }else{
            botonPendiente = <button className="bg-green-500 hover:bg-green-800 text-white font-bold px-2 h-7 rounded-full" onClick={this.actualizarEstado}>Listo</button>
        }          
            return(
                
                <tr className={this.state.pedido.pendiente ? "table-danger" : "table-success"}>
                    <td>{this.state.pedido.usuarioDelPedido.mail}</td>
                    <td>{this.state.pedido.pedidos.length}</td>
                    <td>{this.calcularMontoDelPedido()}</td>
                    <td>
                        {botonPendiente}
                    </td>
                    <Link to={`/chat?name=${this.state.local.nombre}&room=${this.state.pedido._id}`}>chat</Link>
                </tr>                 
            
            )
        }
    }

    export default CarritoEmpresaRow;