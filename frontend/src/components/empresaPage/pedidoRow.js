import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import auth0Client from '../../Auth';
import ChatPedido from '../chatPedido';

class PedidoRow extends Component{

    constructor(props){
        super(props);
        this.state = {
            mostrarPendiente: false,
            local: false
        };
        this.setMostrarPendiente = this.setMostrarPendiente.bind(this);
        this.consultarLocal = this.consultarLocal.bind(this);
    }

    componentDidMount(){
        this.consultarLocal();
    }

    consultarLocal(){
        axios.get('http://localhost:8080/local/' + this.props.idLocal)
        .then((res) => {
          this.setState({local : res.data});
        });
    }

    setMostrarPendiente(){
        this.setState({mostrarPendiente: !this.state.mostrarPendiente})
    }


    render(){
        let precioTotal = 0;
        return(
            <Router>
            <div class="card">
                {console.log(this.state.local)}
                <div class="card-header" id="headingOne" onClick={this.setMostrarPendiente}>
                <h5 class="mb-0">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" onClick={this.mostrarLinksPedido}>
                        Compra de {this.props.pedido.pedidos.length} {this.props.pedido.pedidos.length==1 ? " producto" : " productos"} en {this.state.local.nombre}
                    </button>  
                </h5>
                </div>

                <div id="collapseOne" className={this.state.mostrarPendiente ? "collapse show" : "collapse"} aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body">
                        <div class="table-responsive">
                            <div class="list-group">
                                <Link to={'/empresa/' + this.props.id + `/chat?name=${auth0Client.getProfile().nickname}&room=${this.props.pedido._id}`}>
                                    <p className="flex text-green-600">Chatea con el vendedor aquí&nbsp;
                                        <svg className="bi bi-chat-dots w-6" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                                        <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                        </svg>    
                                    </p>
                                </Link>
                                <Switch>
                                    <Route path="/empresa/:id/chat" render={(props) => <ChatPedido {...props} urlRedirect={"/empresa/"+this.props.id+"/carrito/pendientes/"}/>}/>
                                </Switch>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>SubTotal</th>
                                        </tr>
                                    </thead>
                                    
                                    <tfoot>
                                    {
                                        this.props.pedido.pedidos.map((producto) => {
                                            precioTotal += producto.precio * producto.cantidad; 
                                            return(
                                                <tr>
                                                    <th>{producto.nombre}</th>
                                                    <th>{producto.cantidad}</th>
                                                    <th>{producto.precio * producto.cantidad}</th>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tfoot>
                                </table>
                                <strong>Total ${precioTotal}</strong>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
            </Router>        
        )
    }
}

export default PedidoRow;