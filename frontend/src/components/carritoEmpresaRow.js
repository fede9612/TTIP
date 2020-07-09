import React, { Component } from "react";
import axios from 'axios';
import ChatPedido from "./chatPedido";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import {pedidoListo} from "./mails/pedidoMail";
import renderEmail from "react-html-email/lib/renderEmail";

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

    actualizarEstado(){
        let { pedido } = this.state;
        pedido.pendiente = !pedido.pendiente;
        this.setState({pedido: pedido});
        const mail = renderEmail(pedidoListo(process.env.REACT_APP_URL+'carritos'));
        axios.put(process.env.REACT_APP_URLDATABASE+'/carrito/'+ pedido._id +'/local', {pedido: pedido, menssageHtml: mail}).then(this.props.actualizarPedidos(pedido));
    }
    
    render(){ 
        let botonPendiente;
        if(this.state.pedido.pendiente){
            botonPendiente = <button className="bg-red-600 hover:bg-red-800 text-white font-bold px-2 h-7 rounded-full" onClick={this.actualizarEstado}>Pendiente</button>
        }else{
            botonPendiente = <button className="bg-green-500 hover:bg-green-800 text-white font-bold px-2 h-7 rounded-full" onClick={this.actualizarEstado}>Listo</button>
        }          
            return(
                <Router> 
                <tr className={this.state.pedido.pendiente ? "table-danger" : "table-success"}>
                    <td>{this.state.pedido.usuarioDelPedido.mail}</td>
                    <td>{this.state.pedido.pedidos.length}</td>
                    <td>{this.calcularMontoDelPedido()}</td>
                    <td>
                        {botonPendiente}
                    </td>
                    <td><Link to={`/chat?name=${this.state.local.nombre}&room=${this.state.pedido._id}`}>chat</Link></td>
                        <Switch>
                        <Route path="/chat" render={(props) => <ChatPedido {...props} urlRedirect={"/pedidos/"+this.state.local._id}/>}/>
                        </Switch>
                </tr>                 
                </Router>
            )
        }
    }

    export default CarritoEmpresaRow;