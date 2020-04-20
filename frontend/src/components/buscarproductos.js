import React, { Component } from 'react';
import { Input } from 'reactstrap';
import '../index.css'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';


class BuscarProductos extends Component{

    constructor(props){
        super(props);

        this.state = {
            productos: [], //Estos son los productos que trae para el list del input
            productosBuscado: [],
            nombreProducto: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        this.buscarProductoSubmit()
        event.preventDefault();
    }

    buscarProductoSubmit(){
        axios.get('http://localhost:8080/producto/' + this.state.nombreProducto)
        .then((res) => {
          this.setState({productosBuscado : res.data, nombreProducto:''})
        })
    }

    buscar(nombreDelProducto){
        this.setState({
            nombreProducto: nombreDelProducto
        })
        axios.get('http://localhost:8080/producto/' + this.state.nombreProducto)
        .then((res) => {
          this.setState({productos : res.data})
        })     
    }

    render(){
        let mostrarProductosList = this.state.productos.map((prod) => {
            return(
                <div>
                    <datalist id="productos">
                        <option value={prod.nombre} />
                        )}
                    </datalist>
                </div>
            );
        });

        let mostrarProductosBuscado = this.state.productosBuscado.map((prod) => {
            return(
                <div>
                    <p>{prod.nombre}</p>
                </div>
            );
        });

        return(
            
            <form onSubmit={this.handleSubmit}>
                <div className="w-full max-w-xs flex items-center border-b border-b-2 border-teal-500 py-2">
                <input 
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                    type="text" placeholder="Buscar productos"
                    list="productos" autoComplete="off"
                    value={this.state.nombreProducto}
                    onChange={(ev)=>{this.buscar(ev.target.value)}}
                />   
                {mostrarProductosList}
                <button 
                    className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    type="submit">
                    Buscar
                </button>
                </div>
                {mostrarProductosBuscado}
            </form>
            
        );
    }
}

export default BuscarProductos;