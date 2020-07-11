import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../index.css';
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
      axios.get(process.env.REACT_APP_URLDATABASE+'/local/' + this.state.local._id + '/pedidos')
      .then((res) => {
        this.setState({pedidos : res.data});
      });
    }

    render(){
        return(                
            <div className="mt-2 w-full lg:w-4/5">
                <div className="border-r border-b border-l border-t border-gray-500 rounded-t rounded-b p-2 flex flex-col justify-between leading-normal">
                  <div>
                    <div className="text-gray-900 font-bold text-xl">{this.state.local.nombre}</div>
                    <hr className="bg-gray-500 mb-2"/>
                  </div>
                  <div className="mb-2">
                    <spam> 
                      <Link to={"/pedidos/"+this.state.local._id}>
                        <button className="text-lg">Pedidos</button>
                        <button class={this.calcularPendientes() == 0 ? "bg-green-600 text-white p-2 radius-18" : "bg-red-600 text-white p-2 radius-18" }>
                          {this.calcularPendientes()}
                        </button>
                      </Link>
                    </spam> 
                    <spam className="ml-3 text-lg">
                      Productos: 
                        <spam>{Array.isArray(this.state.local.productos) ? this.state.local.productos.length : 0 } </spam>
                        <Link className="bg-blue-700 text-white p-2 border-solid rounded" to={"/productos/"+this.state.local._id}>
                          <button>Administar</button>
                        </Link>
                    </spam>
                  </div>
                  <div className="flex items-center">
                    <div className="text-xs">
                      <spam className="text-gray-600">Dirección: {this.state.local.direccion}</spam>                 
                    </div>
                  </div>
                </div>
              </div>
                   
        )
    }
}

export default LocalRow;