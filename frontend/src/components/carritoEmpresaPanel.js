import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import CarritoEmpresaRow from './carritoEmpresaRow';
import { ListGroupItem } from 'reactstrap';

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
        axios.get(process.env.REACT_APP_URLDATABASE+'/local/' + this.state.id)
        .then((res) => {
          this.setState({local : res.data});
        }).then(this.consultarPedidos());
    }

    consultarPedidos(){
        axios.get(process.env.REACT_APP_URLDATABASE+'/local/' + this.state.id + '/pedidos')
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
            <div className="mt-2">    
                <div class="w-full">
                    <div>
                        <h4>Pedidos de { this.state.local.nombre }</h4>
                    </div>
                    <hr className="mt-1 mb-2"></hr>
                    <ListGroupItem>
                        {pedidosList}
                    </ListGroupItem>
                </div>
            </div>        
        )
    }
}

export default CarritoEmpresaPanel;