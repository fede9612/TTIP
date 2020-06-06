import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import auth0Client from '../Auth';

class CarritoEmpresaPage extends Component{

    constructor(props){
        super(props);
        this.state = { 
            id: props.match.params.id,
            local: false,
            pedidos: [],
            productoModal: false
        };
        this.consultarCarritos = this.consultarCarritos.bind(this);
        
    }

    componentDidMount(){
        console.log(this.props.id)
        this.consultarCarritos(); 
    }

    consultarCarritos(){
        axios.get('http://localhost:8080/usuario/' + auth0Client.getProfile().nickname + '/pedido/' + this.props.id)
        .then((res) => {
          this.setState({pedidos : res.data});
          console.log(res.data)
        });
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

    // actualizarPedidos(pedido){
    //     let {pedidos} = this.state;
    //     let pedidosActualizados = [];
    //     pedidos.map((pedid) => {
    //         if(pedid._id != pedido._id){
    //             pedidosActualizados.push(pedid);
    //         }else{
    //             pedidosActualizados.push(pedido);
    //         }
    //     });
    //     this.setState({pedidos: pedidosActualizados});
    // }

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
                                    <input type="number" value={producto.cantidad} class="form-control w-16"></input>
                                </td>
                                <td>${producto.precio}</td>
                                <td>${producto.precio * producto.cantidad}</td>
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
                            <form method="post" action="checkout1.html">
                                <h1>Carrito de compra</h1>
                                <p class="text-muted">You currently have 3 item(s) in your cart.</p>
                                <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Unit price</th>
                                        <th>Total</th>
                                    </tr>
                                    </thead>
                                    {productosList}
                                    <tfoot>
                                    <tr>
                                        <th colspan="3">Total</th>
                                        <th>${this.calcularTotal()}</th>
                                    </tr>
                                    </tfoot>
                                </table>
                                </div>
                            
                                <div class="box-footer d-flex justify-content-between flex-column flex-lg-row">
                                <div class="right">
                                    <button type="submit" class="btn btn-primary">Proceed to checkout <i class="fa fa-chevron-right"></i></button>
                                </div>
                                </div>
                            </form>
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