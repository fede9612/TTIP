import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import auth0Client from '../Auth';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import CarritoDeCompra from './empresaPage/carritoDeCompra';
import PedidosPendientes from './empresaPage/pedidosPendientes';

class CarritoEmpresaPage extends Component{

    constructor(props){
        super(props);
        this.state = { 
            id: props.match.params.id,
            local: false,
            pedidos: [],
            pedidosPendientes: [],
            cantidadProducto: 0,
            productoModal: false,
            redirect: false,
            idPreference: "",
            mostrarLinksPedido: false,
        };
        this.mostrarLinksPedido = this.mostrarLinksPedido.bind(this);
        this.consultarPedidosSinConfirmar = this.consultarPedidosSinConfirmar.bind(this);
    }

    componentDidMount(){
        this.consultarPedidosSinConfirmar();
        this.consultarPendientes();
    }

    consultarPedidosSinConfirmar(){
        axios.get('http://localhost:8080/usuario/' + auth0Client.getProfile().nickname + '/pedido/' + this.props.id)
        .then((res) => {
          this.setState({pedidos : res.data});
        });
    }
    
    consultarPendientes(){
        axios.get('http://localhost:8080/usuario/' + auth0Client.getProfile().nickname + '/pedidosPendiente/' + this.props.id)
        .then((res) => {
          this.setState({pedidosPendientes : res.data});
        });
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
                                                <Link to={"/empresa/" + this.props.id + "/carrito"} class="list-group-item">Carrito de compra</Link>
                                                <Link to={"/empresa/" + this.props.id + "/carrito/pendientes"} class="list-group-item">Pedidos pendientes</Link>     
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                       
                        <Switch>
                            <Route path="/empresa/:id/carrito/pendientes" render={(props) => <PedidosPendientes {...props} pedidos={this.state.pedidosPendientes} id={this.props.id}/>}/>
                            <Route  path="/empresa/:id/carrito" 
                                    render={(props) => <CarritoDeCompra {...props} pedidos={this.state.pedidos} id={this.props.id} consultarPedidosSinConfirmar={this.consultarPedidosSinConfirmar}/>}
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


export default CarritoEmpresaPage;