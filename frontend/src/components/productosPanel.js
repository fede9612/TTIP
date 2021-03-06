import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import ProductoRow from './productoRow';
import ProductoModal from './productoModal';
import { Col, Row } from 'reactstrap';
import CargandoInformacion from './cargandoInfo';

class ProductosPanel extends Component{

    constructor(props){
        super(props);
        this.state = { 
            id: props.match.params.id,
            local: false,
            productos: [],
            productoModal: false,
            panel: false
        };
        this.handlerProductoModal = this.handlerProductoModal.bind(this);
        this.agregarProducto = this.agregarProducto.bind(this);
        this.eliminarProducto = this.eliminarProducto.bind(this);
    }

    componentDidMount(){
        this.cargando();
        this.consultarLocal(); 
    }

    cargando(){
        var panel = (
            <div>
                <CargandoInformacion/>
            </div>
        )
        this.setState({panel: panel});
    }
    
    consultarLocal(){
        axios.get(process.env.REACT_APP_URLDATABASE+'/local/' + this.state.id)
        .then((res) => {
          this.setState({local : res.data});
        }).then(this.consultarProductos());
    }

    consultarProductos(){
        axios.get(process.env.REACT_APP_URLDATABASE+'/local/' + this.state.id + '/productos')
        .then((res) => {
          this.setState({productos : res.data});
          this.panelProductosVacio();
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

    eliminarProducto(_productos){
        this.setState({productos: []}, this.consultarLocal());
    }

    panelProductosVacio(){
        var productosList = <div>
                            <p>No hay productos cargados aún</p>
                        </div>
        this.setState({panel: productosList});
    }

    render(){
        let productosList;
        if(Array.isArray(this.state.productos) && this.state.productos.length){
            productosList = this.state.productos.map((producto) => {
                return(
                    <ProductoRow producto={producto} local={this.state.local} eliminarProducto={this.eliminarProducto}/>
                );
            });
        }else{
            productosList = (
                this.state.panel
            )
        }
        let productoModal;
        if(this.state.productoModal){
             productoModal = <ProductoModal handlerClick={this.handlerProductoModal} agregarProducto={this.agregarProducto} local={this.state.local}/> 
        }

        return(
            <div className="mt-2">
                
                    <div class="">
                        <div>
                            <h4 className="inline-block">Productos de { this.state.local.nombre }</h4>
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold px-2 ml-2 h-7 border-b-4 border-l-4 border-t-4 border-r-4 rounded-full"
                                    onClick={this.handlerProductoModal}>
                                Agregar                
                            </button>
                            {productoModal}
                        </div>
                        <hr className="mt-1"></hr>
                        <Row className="justify-center lg:justify-start">
                            {productosList}
                        </Row>
                    </div>
                   
             
            </div>        
        )
    }
}

export default ProductosPanel;