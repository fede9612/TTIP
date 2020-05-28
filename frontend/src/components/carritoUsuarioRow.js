import React, { Component } from "react";
import axios from 'axios';

class CarritoEmpresaRow extends Component{

    constructor(props){
        super(props);
        this.state = {
            pedido : props.pedido
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

    actualizarEstado(){
        let { pedido } = this.state;
        pedido.confirmado = !pedido.confirmado;
        this.setState({pedido: pedido});
        axios.put('http://localhost:8080/carrito/'+ pedido._id +'/local', pedido).then(this.props.actualizarPedidos(pedido));
    }
    
    render(){  
        let botonConfirmado;
        if(this.state.pedido.confirmado){
            botonConfirmado = <button className="bg-red-600 hover:bg-red-800 text-white font-bold px-2 h-7 rounded-full" onClick={this.actualizarEstado}>Cancelar compra</button>
        }else{
            botonConfirmado = <button className="bg-green-500 hover:bg-green-800 text-white font-bold px-2 h-7 rounded-full" onClick={this.actualizarEstado}>Confirmar compra</button>
        }
        let pendiente;
        if(this.state.pedido.pendiente){
            pendiente = <button className="bg-red-600 text-white font-bold px-2 h-7 rounded-full">Pendiente</button>
        }else{
            pendiente = <button className="bg-green-500 text-white font-bold px-2 h-7 rounded-full">Listo</button>
        }          
            return(
                
                <tr>
                    <td>{this.state.pedido.usuarioDelPedido.mail}</td>
                    <td>{this.state.pedido.pedidos.length}</td>
                    <td>{this.calcularMontoDelPedido()}</td>
                    <td>{pendiente}</td>
                    <td>
                        {botonConfirmado}
                    </td>
                </tr>                 
            
            
            )
        }
    }

    export default CarritoEmpresaRow;