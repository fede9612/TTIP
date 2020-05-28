import React, { Component } from "react";
import axios from 'axios';

class CarritoEmpresaRow extends Component{

    constructor(props){
        super(props);
        this.state = {
            pedido : props.pedido
        };
    }

    calcularMontoDelPedido(){
        let monto = 0;
        this.state.pedido.pedidos.map((producto) =>{
            monto += producto.precio;
        });
        return monto;
    }
    
    render(){  
        let botonConfirmado;
        if(this.state.pedido.confirmado){
            botonConfirmado = <button className="bg-red-600 hover:bg-red-800 text-white font-bold px-2 h-7 rounded-full">Cancelar compra</button>
        }else{
            botonConfirmado = <button className="bg-green-500 hover:bg-green-800 text-white font-bold px-2 h-7 rounded-full">Confirmar compra</button>
        }          
            return(
                
                <tr>
                    <td>{this.state.pedido.usuarioDelPedido.mail}</td>
                    <td>{this.state.pedido.pedidos.length}</td>
                    <td>{this.calcularMontoDelPedido()}</td>
                    <td>
                        {botonConfirmado}
                    </td>
                </tr>                 
            
            
            )
        }
    }

    export default CarritoEmpresaRow;