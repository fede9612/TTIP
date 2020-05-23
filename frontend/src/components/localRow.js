import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';


class LocalRow extends Component{

    constructor(props){
        super(props);
        this.state = {
            local : props.local,
            pedidos : []
        };
        this.consultarPedidos = this.consultarPedidos.bind(this);
    }

    componentDidMount(){
      this.consultarPedidos(); 
    }

    calcularPendientes(){
      let cantPendientes = 0;
      this.state.pedidos.map((pedido) => {
          if(pedido.pendiente){
            cantPendientes += 1;
          }
      });
      return cantPendientes;
    }

    consultarPedidos(){
      axios.get('http://localhost:8080/local/' + this.state.local._id + '/pedidos')
      .then((res) => {
        this.setState({pedidos : res.data});
      });
    }

    render(){
        return(
                
            <div className="mt-2 w-full lg:w-4/5">
                <div className="border-r border-b border-l border-t border-gray-500 rounded-t rounded-b p-2 flex flex-col justify-between leading-normal">
                  <div>
                    <div className="text-gray-900 font-bold text-xl mb-2">{this.state.local.nombre}</div>
                  </div>
                    <spam className="text-gray-700 text-base">Pedidos pendientes 
                    <Link to={"/pedidos/"+this.state.local._id}> <spam class="rounded-t rounded-b bg-red-600 text-white p-1">{this.calcularPendientes()} </spam></Link></spam>
                    <spam className="text-gray-700 text-base">Productos en stock: <spam>{this.state.local.productos.length} </spam><Link to={"/productos/"+this.state.local._id}>Ver</Link></spam>
                  <div className="flex items-center">
                    
                    <div className="text-xs">
                    <spam className="text-gray-600">Dirección: {this.state.local.direccion} </spam>                 
                    </div>
                  </div>
                </div>
              </div>
                   
        )
    }
}

export default LocalRow;