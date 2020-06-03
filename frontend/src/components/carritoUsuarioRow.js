import React, { Component } from "react";
import axios from 'axios';
import auth0Client from '../Auth';
import { Link } from "react-router-dom";

class CarritoEmpresaRow extends Component{

    constructor(props){
        super(props);
        this.state = {
            pedido : props.pedido,
            idPreference: '',
            redirect: false
        };
        this.actualizarEstado = this.actualizarEstado.bind(this);
        this.getIdPreference = this.getIdPreference.bind(this);
    }

    componentWillMount(){
        this.getIdPreference();
    }

    getIdPreference(){
        axios.post('http://localhost:8080/mercadopago', this.state.pedido.pedidos).then((res) => this.setState({idPreference: res.data}));
    }

    setRedirect = () => {
        this.setState({
          redirect: true
        })
    }

    redirectMercadopago(url){
        console.log("url: " + url)
        if(this.state.redirect){
            return <Link component={() => { 
                    window.location.href = url; 
                    return null;
                }}/>
        }
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
        axios.put('http://localhost:8080/carrito/'+ pedido._id +'/usuario', pedido).then(this.props.actualizarPedidos(pedido));
    }
    
    render(){  
        let botonConfirmado;
        if(this.state.pedido.confirmado){
            botonConfirmado = <button className="bg-red-600 hover:bg-red-800 text-white font-bold px-2 h-7 rounded-full" onClick={this.actualizarEstado}>Cancelar</button>
        }else{
            botonConfirmado = <button className="bg-green-500 hover:bg-green-800 text-white font-bold px-2 h-7 rounded-full" onClick={this.actualizarEstado}>Confirmar</button>
        }
        let pendiente;
        if(this.state.pedido.pendiente){
            pendiente = <button className="bg-red-600 text-white font-bold px-2 h-7 rounded-full">Pendiente</button>
        }else{
            pendiente = <button className="bg-green-500 text-white font-bold px-2 h-7 rounded-full">Listo</button>
        }          
            return(
                
                <tr>
                    {this.redirectMercadopago(this.state.idPreference)}
                    <td>{this.state.pedido.local.nombre}</td>
                    <td>{this.state.pedido.pedidos.length}</td>
                    <td>{this.calcularMontoDelPedido()}</td>
                    <td>{pendiente}</td>
                    <td>
                    <button onClick={this.setRedirect}>Comprar</button>
                    </td>
                    <td><Link to={`/chat?name=${auth0Client.getProfile().nickname}&room=${this.state.pedido._id}`}>chat</Link></td>
                </tr>                 
            
            
            )
        }
    }

    export default CarritoEmpresaRow;