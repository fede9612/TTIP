import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import auth0Client from '../Auth';
import CarritoUsuarioRow from '../components/carritoUsuarioRow';

class CarritoUsuarioPanel extends Component{

    constructor(props){
        super(props);
        this.state = { 
            local: false,
            pedidos: [],
            productoModal: false
        };
    }

    componentDidMount(){
        this.consultarCarritos(); 
    }

    consultarCarritos(){
        axios.get('http://localhost:8080/usuario/' + auth0Client.getProfile().nickname + '/pedidos')
        .then((res) => {
            console.log(res.data);
          this.setState({pedidos : res.data});
        });
    }

    render(){
        let pedidosList;
        if(Array.isArray(this.state.pedidos) && this.state.pedidos.length){
            pedidosList = this.state.pedidos.map((pedido) => {
                return(<CarritoUsuarioRow pedido={pedido} />);
            });
        }else{
            pedidosList = (
                <div>
                    <p>No hay pedidos aún</p>
                </div>
            )
        }

        return(
            <div className="container mt-2">
                <div class="flex flex-wrap">
                    <div class="w-full lg:w-1/4 ">
                        {/* <h4>Local</h4>
                        <hr className="w-4/5 mt-2"></hr>
                        <p>{ this.state.local.nombre }</p> */}
                    </div>
                    <div class="w-full lg:w-3/4">
                        <div className="flex">
                            <h4>Carritos</h4>
                        </div>
                        <hr className="mt-1"></hr>
                        <div className="w-full border-b-2 border-l-2 border-r-2 rounded-t rounded-b mt-2">
                        <table class="table ">
                            <thead>
                                <tr>
                                <th scope="col">Solicitante</th>
                                <th scope="col">Cantidad productos</th>
                                <th scope="col">Total</th>
                                <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedidosList}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>    
             
            </div>        
        )
    }
}

export default CarritoUsuarioPanel;