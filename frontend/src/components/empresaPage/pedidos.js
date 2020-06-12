import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import PedidoRow from './pedidoRow';

class Pedidos extends Component{

    constructor(props){
        super(props);
        this.state = { 
        };
        
    }

    componentDidMount(){
         
    }

    render(){
        return(
            <div className="col-12 col-xl-9 col-lg-9 col-sm-9 col-md-9 mt-2">
                <div className="">
                    <div className="box">
                        <h1>Pedidos {this.props.titulo}</h1>
                    </div>
                    <div id="accordion" >
                    {
                        this.props.pedidos.map((pedido) => {
                            console.log(pedido)
                            return(
                                <PedidoRow pedido={pedido} id={this.props.id}/>
                            )
                        })
                    }
                    </div>
                </div>
            </div>        
        )
    }
}

export default Pedidos;