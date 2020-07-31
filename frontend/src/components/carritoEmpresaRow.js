import React, { Component } from "react";
import axios from 'axios';
import {socket} from './notificacion/notificacion';
import ChatPedido from "./chatPedido";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import {pedidoListo} from "./mails/pedidoMail";
import renderEmail from "react-html-email/lib/renderEmail";

class CarritoEmpresaRow extends Component{

    constructor(props){
        super(props);
        this.state = {
            pedido: props.pedido,
            local: props.local,
            collapse: false
        };
        this.actualizarEstado = this.actualizarEstado.bind(this);
        this.handlerCollapse = this.handlerCollapse.bind(this);
    }

    handlerCollapse(){
        this.setState({collapse: !this.state.collapse});
    }

    actualizarEstado(){
        let { pedido } = this.state;
        pedido.pendiente = !pedido.pendiente;
        this.setState({pedido: pedido});
        const mail = renderEmail(pedidoListo());
        axios.put(process.env.REACT_APP_URLDATABASE+'/carrito/'+ pedido._id +'/local', {pedido: pedido, messageHtml: mail})
        .then(() => {
            this.props.actualizarPedidos(pedido)
            if(!pedido.pendiente){
                axios.get(process.env.REACT_APP_URLDATABASE+'/local/'+pedido.local)
                .then((res) => {
                    var notificacion = {nickname:pedido.usuarioDelPedido.mail, contenido: `Su pedido en ${res.data.empresa.nombre} está listo`}
                    socket.emit('connectionNotification', notificacion);
                })
            }
        });
    }
    
    render(){ 
        let botonPendiente;
        var precioTotal = 0;          
        if(this.state.pedido.pendiente){
            botonPendiente = <button className="bg-red-600 hover:bg-red-800 text-white font-bold px-2 h-7 rounded-full" onClick={this.actualizarEstado}>Pendiente</button>
        }else{
            botonPendiente = <button className="bg-green-500 hover:bg-green-800 text-white font-bold px-2 h-7 rounded-full" onClick={this.actualizarEstado}>Listo</button>
        }
        return(
            <Router> 
                <hr className="border-solid" color={this.state.pedido.pendiente ? "red" : "green"}></hr>
                <table class="table ">
                    <tbody>
                        <tr className={this.state.pedido.pendiente ? "table-danger" : "table-success"}>
                            <td>{this.state.pedido.usuarioDelPedido.mail}</td>
                            <td>
                                {botonPendiente}
                            </td>
                            <td>
                                <button 
                                    className="bg-blue-600 hover:bg-blue-900 text-white font-bold px-2 h-7 rounded-full"
                                    data-toggle="collapse" 
                                    data-target="#collapsePedido" 
                                    aria-expanded="false" aria-controls="collapsePedido"
                                    onClick={this.handlerCollapse}>
                                    Detalle
                                </button>
                            </td>
                        </tr>                 
                    </tbody>
                </table>
            <div class={this.state.collapse ? "collapse show" : "collapse"} id="collapsePedido">
                <Link to={`/chat?name=${this.state.local.nombre}&room=${this.state.pedido._id}`}>
                    <p className="flex text-green-600">Chatea con el comprador aquí&nbsp;
                        <svg className="bi bi-chat-dots w-6" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                        <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                        </svg>    
                    </p>
                </Link>
                <Switch>
                    <Route path="/chat" render={(props) => <ChatPedido {...props} urlRedirect={"/pedidos/"+this.state.local._id}/>}/>
                </Switch>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>SubTotal</th>
                        </tr>
                    </thead>
                    
                    <tfoot>
                    {
                        this.state.pedido.pedidos.map((producto) => {
                            precioTotal += producto.precio * producto.cantidad; 
                            return(
                                <tr>
                                    <th>{producto.nombre}</th>
                                    <th>{producto.cantidad}</th>
                                    <th>{producto.precio * producto.cantidad}</th>
                                </tr>
                            )
                        })
                    }
                    </tfoot>
                </table>
                <strong>Total ${precioTotal}</strong>
            </div>
            </Router>
        )
        }
    }

    export default CarritoEmpresaRow;