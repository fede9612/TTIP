import React, { Component } from 'react';
import { Input } from 'reactstrap';
import axios from 'axios';


class BuscarProductos extends Component{

    constructor(props){
        super(props);

        this.state = {
            productos: [],
            nombreProducto: ''
        }
    }

    buscar(nombreDelProducto){
        console.log(nombreDelProducto);
        this.setState({
            nombreProducto: nombreDelProducto
        })
        axios.get('http://localhost:8080/producto/' + this.state.nombreProducto)
        .then((res) => {
          this.setState({productos : res.data})
        })     
    }

    render(){
        let mostrarProductos = this.state.productos.map((prod) => {
            return(
                <div>
                    <p>{prod.nombre}</p>
                </div>
            );
        });

        return(
            <div>
                <form>
                <p>Buscar</p>
                <input 
                onChange={(ev)=>{this.buscar(ev.target.value)}}
                />
                <button type="submit">Buscar</button>
                </form>
                {mostrarProductos}
            </div>
        );
    }
}

export default BuscarProductos;