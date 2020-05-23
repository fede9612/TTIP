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
                return(<CarritoEmpresaRow pedido={pedido}  actualizarPedidos={this.actualizarPedidos}/>);
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
                        <hr className="w-4/5 mt-1"></hr>
                        <p>{ this.state.local.nombre }</p>
                    </div>
                    <div class="w-full lg:w-3/4">
                        <div className="flex">
                            <h4>Pedidos</h4>
                        </div>
                        <hr className="mt-1"></hr>
                        <div className="w-full border-b-2 border-l-2 border-r-2 rounded-t rounded-b">
                        <table class="table ">
                            <thead>
                                <tr>
                                <th scope="col">Solicitante</th>
                                <th scope="col">Cantidad productos</th>
                                <th scope="col">Total</th>
                                <th scope="col">Estado</th>
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