import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import ProductoRow from './productoRow';
import ProductoModal from './productoModal';
import CarritoEmpresaRow from './carritoEmpresaRow';

class CarritoEmpresaPanel extends Component{

    constructor(props){
        super(props);
        this.state = { 
            id: props.match.params.id,
            local: false,
            pedidos: [],
            productoModal: false
        };
        this.actualizarPedidos = this.actualizarPedidos.bind(this);
    }

    componentDidMount(){
        this.consultarLocal(); 
    }
    
    consultarLocal(){
        axios.get('http://localhost:8080/local/' + this.state.id)
        .then((res) => {
          this.setState({local : res.data});
        }).then(this.consultarPedidos());
    }

    consultarPedidos(){
        axios.get('http://localhost:8080/local/' + this.state.id + '/pedidos')
        .then((res) => {
          this.setState({pedidos : res.data});
        });
    }

    actualizarPedidos(pedido){
        let {pedidos} = this.state;
        let pedidosActualizados = [];
        pedidos.map((pedid) => {
            if(pedid._id != pedido._id){
                pedidosActualizados.push(pedid);
            }else{
                pedidosActualizados.push(pedido);
            }
        });
        this.setState({pedidos: pedidosActualizados});
    }

    render(){
        let pedidosList;
        if(Array.isArray(this.state.pedidos) && this.state.pedidos.length){
            pedidosList = this.state.pedidos.map((pedido) => {
                return(<CarritoEmpresaRow pedido={pedido} local={this.state.local} actualizarPedidos={this.actualizarPedidos}/>);
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
                        <h4>Local</h4>
                        <hr className="w-4/5 mt-2"></hr>
                        <p>{ this.state.local.nombre }</p>
                    </div>
                    <div class="w-full lg:w-3/4">
                        <div className="flex">
                            <h4>Pedidos</h4>
                        </div>
                        <hr className="mt-1"></hr>
                        <div className="w-full border-b-2 border-l-2 border-r-2 rounded-t rounded-b mt-2">
                        <table class="table ">
                            <thead>
                                <tr>
                                <th scope="col">Solicitante</th>
                                <th scope="col">Cantidad productos</th>
                                <th scope="col">Total</th>
                                <th scope="col">Estado</th>
                                <th scope="col">
                                <svg className="bi bi-chat-dots w-6" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                   <path fill-rule="evenodd" d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                                    <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                </svg>
                                </th>
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

export default CarritoEmpresaPanel;