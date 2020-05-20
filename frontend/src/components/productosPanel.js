import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import ProductoRow from './productoRow';
import ProductoModal from './productoModal';

class ProductosPanel extends Component{

    constructor(props){
        super(props);
        this.state = { 
            id: props.match.params.id,
            local: false,
            productos: [],
            productoModal: false
        };
        this.handlerProductoModal = this.handlerProductoModal.bind(this);
        this.agregarProducto = this.agregarProducto.bind(this);
    }

    componentDidMount(){
        this.consultarLocal(); 
    }
    
    consultarLocal(){
        axios.get('http://localhost:8080/local/' + this.state.id)
        .then((res) => {
          this.setState({local : res.data});
        }).then(this.consultarProductos());
    }

    consultarProductos(){
        axios.get('http://localhost:8080/local/' + this.state.id + '/productos')
        .then((res) => {
          this.setState({productos : res.data});
        });
    }

    handlerProductoModal(){
        this.setState({productoModal: !this.state.productoModal})
    }

    agregarProducto(producto){
        let {productos} = this.state;
        productos.push(producto);
        this.setState({productos: productos})
    }

    render(){
        let productosList;
        if(Array.isArray(this.state.productos) && this.state.productos.length){
            productosList = this.state.productos.map((producto) => {
                return(
                    <ProductoRow producto={producto} />
                );
            });
        }else{
            productosList = (
                <div>
                    <p>No hay productos cargados aún</p>
                </div>
            )
        }
        let productoModal;
        if(this.state.productoModal){
             productoModal = (
                <div className="mr-8">
                    <ProductoModal handlerClick={this.handlerProductoModal} agregarProducto={this.agregarProducto} local={this.state.local}/> 
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
                            <h4>Productos</h4>
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold px-2 ml-2 h-7 border-b-4 border-l-4 border-t-4 border-r-4 rounded-full"
                                    onClick={this.handlerProductoModal}>
                                Agregar                
                            </button>
                            {productoModal}
                        </div>
                        <hr className="mt-1"></hr>
                        <div className="w-full lg:flex lg:w-10/12 md:flex md:w-10/12">
                            {productosList}
                        </div>
                    </div>
                </div>    
             
            </div>        
        )
    }
}

export default ProductosPanel;