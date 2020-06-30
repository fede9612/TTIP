import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import auth0Client from '../Auth';
import { Row, Col } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CarritoDeCompra from './empresaPage/carritoDeCompra';

class CarritoUsuarioPanel extends Component{

    constructor(props){
        super(props);
        this.state = { 
            local: false,
            pedidos: [],
            productoModal: false,
            pedidosSinConfirmar: []
        };
        this.actualizarPedidos = this.actualizarPedidos.bind(this);
        this.consultarCarritos = this.consultarCarritos.bind(this);
    }

    componentDidMount(){
        this.consultarCarritos(); 
    }

    consultarCarritos(){
        this.setState({pedidosSinConfirmar: []})
        axios.get('http://localhost:8080/usuario/' + auth0Client.getProfile().nickname + '/pedidos')
        .then((res) => {
          this.setState({pedidos : res.data});
          var empresas = [];
          res.data.map((pedido) =>{
              empresas.push(pedido.local.empresa)
          });
          var empresasSinRepetidos = empresas.filter((el, index) => empresas.indexOf(el) === index)
          empresasSinRepetidos.map((idEmpresa) => {
              axios.get('http://localhost:8080/usuario/' + auth0Client.getProfile().nickname + '/pedido/' + idEmpresa)
              .then((res) => {
                    // var empresa = {pedidosPendientes: res.data, id: idEmpresa};
                    this.setState({pedidosSinConfirmar: this.state.pedidosSinConfirmar.concat(res.data)});
                });
          })
        });
    }

    actualizarPedidos(pedido){
        let {pedidos} = this.state;
        let pedidosActualizados = [];
        pedidos.map((pedid) => {
            if(pedid._id != pedido._id){
                pedidosActualizados.push(pedid);
            }else{
                pedidosActualizados.push(pedido);
            }
        });
        this.setState({pedidos: pedidosActualizados});
    }

    render(){
        return(
            <Router>
            <div className="container mt-4">

                <Row>
                    <Col sm={{size: 3}}>
                                <h5 class="mb-0">
                                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" onClick={this.mostrarLinksPedido}>
                                    Pedidos
                                    </button>
                                </h5>
                               

                                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                    <div class="card-body">
                                        <div class="list-group">
                                            <Link to={"/pedidos/carritos"} class="list-group-item">Carrito de compra</Link>    
                                        </div>
                                    </div>
                                </div>
                    </Col>  
                    <Col>
                        <Switch>
                            {/* <Route  path="/empresa/:id/carrito/pendientes" 
                                    render={(props) => <Pedidos {...props} pedidos={this.state.pedidosPendientes} id={this.props.id} titulo="pendientes"/>}
                            />
                            <Route  path="/empresa/:id/carrito/listos" 
                                    render={(props) => <Pedidos {...props} pedidos={this.state.pedidosListos} id={this.props.id} titulo="listos"/>}
                            /> */}
                            {console.log(this.state.empresas)}
                            <Route  path="/pedidos/carritos" 
                                    render={(props) => <CarritoDeCompra {...props} pedidos={this.state.pedidosSinConfirmar} consultarPedidosSinConfirmar={this.consultarCarritos}/>}
                            />
                        </Switch>
                    </Col>
                        
                </Row>
            </div>
            </Router>
             
        )
    }
}

export default CarritoUsuarioPanel;