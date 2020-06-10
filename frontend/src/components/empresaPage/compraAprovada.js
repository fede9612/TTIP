import React, { Component } from "react";
import imgConfirmed from '../../styles/img/confirmed.svg';
import axios from 'axios';
import auth0Client from "../../Auth";

class CompraAprovada extends Component{

    constructor(props){
        super(props);
        this.state = {
        };
    }

    async componentWillMount(){
        await auth0Client.silentAuth();
        this.consultarPedidosPendientes();
    }

    consultarPedidosPendientes(){
        axios.get('http://localhost:8080/usuario/' + auth0Client.getProfile().nickname + '/pedido/' + this.props.match.params.id)
        .then((res) => {
          res.data.map((pedido) => {
              pedido.confirmado = true;
              const vendedorEnvioDeMail = this.obtenerVendedor(pedido);
              axios.put('http://localhost:8080/carrito/' + pedido._id + '/usuario', {pedido, idVendedor: vendedorEnvioDeMail})
              .then((res) => console.log(res.data));
          })
        });
    }

    obtenerVendedor(pedido){
        var usuario;
        axios.get('http://localhost:8080/local/' + pedido.local)
        .then((res) => usuario = res.data.empresa.usuario);
        return usuario;
    }

    
    render(){  
        return(
            <div className="container mt-20">
                <div className="d-flex justify-content-center"><h1>Se acreditó su pago, muchas gracias por su compra</h1></div>
                <div className="d-flex justify-content-center mt-4">
                    <img className="w-1/4" src={imgConfirmed}></img> 
                </div>
            </div>
        )
    }
}

export default CompraAprovada;