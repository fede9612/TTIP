import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import auth0Client from '../Auth';
import { Link } from 'react-router-dom';

class CarritoEmpresaPage extends Component{

    constructor(props){
        super(props);
        this.state = { 
            id: props.match.params.id,
            local: false,
            pedidos: [],
            cantidadProducto: 0,
            productoModal: false,
            redirect: false,
            idPreference: ""
        };
        this.consultarCarritos = this.consultarCarritos.bind(this);
        this.eliminarProducto = this.eliminarProducto.bind(this);
        this.comprar = this.comprar.bind(this);
    }

    componentDidMount(){
        console.log(this.props.id)
        this.consultarCarritos();
        console.log(this.state.pedidoActual) 
    }

    consultarCarritos(){
        axios.get('http://localhost:8080/usuario/' + auth0Client.getProfile().nickname + '/pedido/' + this.props.id)
        .then((res) => {
          this.setState({pedidos : res.data});
        });
    }

    eliminarProducto(pedido, producto){
        axios.put('http://localhost:8080/carrito/' + pedido._id + '/producto/', producto)
        .then(this.consultarCarritos());
    }

    sumarUnProducto(pedido, producto){
        axios.put('http://localhost:8080/carrito/' + pedido._id + '/producto/sumar/', producto)
        .then(this.consultarCarritos());
    }

    restarUnProducto(pedido, producto){
        axios.put('http://localhost:8080/carrito/' + pedido._id + '/producto/restar/', producto)
        .then(this.consultarCarritos());
    }

    calcularTotal(){
        var total = 0;
        this.state.pedidos.map((pedido) => {
            return pedido.pedidos.map((producto) => {
                total += producto.precio * producto.cantidad
            });
        });
        return total;
    }

    comprar(){
        var productos = [];
        var local;
        this.state.pedidos.map((pedido) => {
            local = pedido.local;
            pedido.pedidos.map((producto) => {
                productos.push(producto);    
            })
        })
        console.log(this.state.pedidos)
        axios.get('http://localhost:8080/local/' + local).then((res) =>{
            console.log(res.data.empresa.usuario)
            axios.post('http://localhost:8080/mercadopago/' + res.data.empresa.usuario, productos)
            .then((res) => {
                this.setState({idPreference: res.data});
                this.setRedirect();
            });
        })
    }

    setRedirect = () => {
        this.setState({
          redirect: true
        })
    }

    redirectMercadopago(url){
        console.log("url: " + url)
        if(this.state.redirect){
            return <Link component={() => { 
                    window.location.href = url; 
                    return null;
                }}/>
        }
    }

    render(){
        let productosList;
        if(Array.isArray(this.state.pedidos) && this.state.pedidos.length){
            productosList = this.state.pedidos.map((pedido) => {
                return pedido.pedidos.map((producto) => {
                    return(
                        <tbody>
                            <tr>
                                <td className="flex"><img src={auth0Client.getProfile().picture} alt="" className="w-16 h-20"></img><a href="#">{producto.nombre}</a></td>
                                <td>
                                    <p>
                                        <button onClick={() => this.restarUnProducto(pedido, producto)}>
                                        <svg class="bi bi-chevron-left h-5" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                        </svg>
                                        </button>
                                            <span className="text-lg">{producto.cantidad}</span>
                                        <button onClick={() => this.sumarUnProducto(pedido, producto)}>
                                        <svg class="bi bi-chevron-right h-5" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                        </button>
                                    </p>
                                </td>
                                <td>${producto.precio}</td>
                                <td>${producto.precio * producto.cantidad}</td>
                                <td><button onClick={() => this.eliminarProducto(pedido, producto)}>
                                        <svg class="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                                            <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    );
                })
            })
        }else{
            productosList = (
                <div>
                    <p>No hay pedidos aún</p>
                </div>
            )
        }
        return(
            <div className="mt-12">
                <div id="all">
                    <div id="content">
                    <div >
                        <div class="row"></div>
                        <div id="basket" class="col-12 col-xl-9 col-lg-9 col-sm-12 col-md-10">
                            <div class="box">
                            
                                <h1>Carrito de compra</h1>
                                <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio unitario</th>
                                        <th>SubTotal</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    {productosList}
                                    <tfoot>
                                    <tr>
                                        <th colspan="3"></th>
                                        <th>Total ${this.calcularTotal()}</th>
                                    </tr>
                                    </tfoot>
                                </table>
                                </div>
                            
                                <div class="box-footer d-flex justify-content-between flex-column flex-lg-row">
                                <div class="right">
                                    <button type="submit" class="btn btn-primary" onClick={this.comprar}>Continuar comprando <i class="fa fa-chevron-right"></i></button>
                                    {this.redirectMercadopago(this.state.idPreference)}
                                </div>
                                </div>
                            
                            </div>
                        </div>
                    </div>
                    </div>
                </div> 
            </div>
        )
    }
}

export default CarritoEmpresaPage;