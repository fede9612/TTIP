import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import auth0Client from '../Auth';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

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
            idPreference: "",
            mostrarLinksPedido: false,
        };
        this.consultarCarritos = this.consultarPedidosPendientes.bind(this);
        this.eliminarProducto = this.eliminarProducto.bind(this);
        this.comprar = this.comprar.bind(this);
        this.mostrarLinksPedido = this.mostrarLinksPedido.bind(this);
        this.calcularTotal = this.calcularTotal.bind(this);
        this.redirectMercadopago = this.redirectMercadopago.bind(this);
    }

    componentDidMount(){
        console.log(this.props.id)
        this.consultarPedidosPendientes();
        console.log(this.state.pedidoActual) 
    }

    consultarPedidosPendientes(){
        axios.get('http://localhost:8080/usuario/' + auth0Client.getProfile().nickname + '/pedido/' + this.props.id)
        .then((res) => {
          this.setState({pedidos : res.data});
        });
    }

    eliminarProducto(pedido, producto){
        axios.put('http://localhost:8080/carrito/' + pedido._id + '/producto/', producto)
        .then(this.consultarPedidosPendientes());
    }

    sumarUnProducto(pedido, producto){
        axios.put('http://localhost:8080/carrito/' + pedido._id + '/producto/sumar/', producto)
        .then(this.consultarPedidosPendientes());
    }

    restarUnProducto(pedido, producto){
        axios.put('http://localhost:8080/carrito/' + pedido._id + '/producto/restar/', producto)
        .then(this.consultarPedidosPendientes());
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
            axios.post('http://localhost:8080/mercadopago/' + res.data.empresa.usuario, {productos, redirect: "http://localhost:3000/empresa/"+this.props.id+"/aprovado"})
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

    mostrarLinksPedido(){
        this.setState({mostrarLinksPedido: !this.state.mostrarLinksPedido});
    }

    render(){
        return(
            <Router>
            <div className="container mt-12">
                <div id="all">
                    <div id="content">
                    <div className="row">
                        <div className="col-lg-3 mt-10">
                            <div id="accordion">
                                <div class="card">
                                    <div class="card-header" id="headingOne">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" onClick={this.mostrarLinksPedido}>
                                        Pedidos
                                        </button>
                                    </h5>
                                    </div>

                                    <div id="collapseOne" class={this.state.mostrarLinksPedido ? "collapse show": "collapse"} aria-labelledby="headingOne" data-parent="#accordion">
                                        <div class="card-body">
                                            <div class="list-group">
                                                <Link to={"/empresa/" + this.props.id + "/carrito/carritoDeCompra"} class="list-group-item">Carrito de compra</Link>    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                       
                        <Switch>
                            <Route  path="/empresa/:id/carrito/carritoDeCompra" 
                                    render={(props) => 
                                    <Carrito {...props} 
                                    pedidos={this.state.pedidos} idPreference={this.state.idPreference} 
                                    restarUnProducto={this.restarUnProducto} sumarUnProducto={this.sumarUnProducto} 
                                    eliminarProducto={this.eliminarProducto} calcularTotal={this.calcularTotal} 
                                    comprar={this.comprar} redirectMercadopago={this.redirectMercadopago}/>}
                            />
                        </Switch>


                    </div>
                    </div>
                </div> 
            </div>
            </Router>
        )
    }
}

function Carrito(props){
    let productosList;
        if(Array.isArray(props.pedidos) && props.pedidos.length){
            productosList = props.pedidos.map((pedido) => {
                return pedido.pedidos.map((producto) => {
                    return(
                        <tbody>
                            <tr>
                                <td className="flex"><img src={auth0Client.getProfile().picture} alt="" className="w-16 h-20"></img><a href="#">{producto.nombre}</a></td>
                                <td>
                                    <p>
                                        <button onClick={() => props.restarUnProducto(pedido, producto)}>
                                        <svg class="bi bi-chevron-left h-5" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                        </svg>
                                        </button>
                                            <span className="text-lg">{producto.cantidad}</span>
                                        <button onClick={() => props.sumarUnProducto(pedido, producto)}>
                                        <svg class="bi bi-chevron-right h-5" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                        </button>
                                    </p>
                                </td>
                                <td>${producto.precio}</td>
                                <td>${producto.precio * producto.cantidad}</td>
                                <td><button onClick={() => props.eliminarProducto(pedido, producto)}>
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
                                        <th>Total ${props.calcularTotal()}</th>
                                    </tr>
                                    </tfoot>
                                </table>
                                </div>
                            
                                <div class="box-footer d-flex justify-content-between flex-column flex-lg-row">
                                <div class="right">
                                    <button type="submit" class="btn btn-primary" onClick={props.comprar}>Continuar comprando <i class="fa fa-chevron-right"></i></button>
                                    {props.redirectMercadopago(props.idPreference)}
                                </div>
                                </div>
                            </div>
            </div>
    );
    
}

export default CarritoEmpresaPage;