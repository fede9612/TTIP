import React, { Component } from 'react';
import { Input } from 'reactstrap';
import '../index.css'
import 'bootstrap/dist/css/bootstrap.css';
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

        return(
            <body className="color-fondo">
            <div className="container">
                <form>
                <p>Buscar</p>
                <input list="productos" autoComplete="off"
                onChange={(ev)=>{this.buscar(ev.target.value)}}
                />   
                {mostrarProductosList}
                <button type="submit">Buscar</button>
                </form>
            </div>
            </body>
        );
    }
}

export default BuscarProductos;