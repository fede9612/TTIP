import React, { Component } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import ProductosPanel from "./productosPanel";


class LocalRow extends Component{

    constructor(props){
        super(props);
        this.state = {
            local : props.local
        };
    }

    render(){
        return(
                
            <div className="mt-2 w-full lg:w-4/5">
                <div className="border-r border-b border-l border-t border-gray-500 rounded-t rounded-b p-2 flex flex-col justify-between leading-normal">
                  <div>
                    <div className="text-gray-900 font-bold text-xl mb-2">{this.state.local.nombre}</div>
                  </div>
                    <spam className="text-gray-700 text-base">Pedidos pendientes: <spam>{this.state.local.carritosDePedido.length}</spam></spam>
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