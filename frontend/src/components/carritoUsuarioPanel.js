import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import auth0Client from '../Auth';
import { Row, Col, Container } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CarritoDeCompra from './empresaPage/carritoDeCompra';
import Pedidos from './empresaPage/pedidos';

class CarritoUsuarioPanel extends Component{

    constructor(props){
        super(props);
        this.state = { 
            local: false,
            pedidos: [],
            productoModal: false,
            pedidosSinConfirmar: [],
            pedidosPendientes: []
        };
        this.consultarCarritos = this.consultarCarritos.bind(this);
        this.empresasVendedoras = this.empresasVendedoras.bind(this);
        this.consultarPedidosListos = this.consultarPedidosListos.bind(this);
    }

    componentDidMount(){
        this.consultarCarritos(); 
        this.consultarPedidosPendientes();
        this.consultarPedidosListos();
    }

    empresasVendedoras(res){
        this.setState({pedidos : res.data});
        var empresas = [];
        res.data.map((pedido) =>{
            empresas.push(pedido.local.empresa)
        });
        var empresasSinRepetidos = empresas.filter((el, index) => empresas.indexOf(el) === index);
        return empresasSinRepetidos;
    }

    consultarCarritos(){
        this.setState({pedidosSinConfirmar: []});
        axios.get(process.env.REACT_APP_URLDATABASE+'/usuario/' + auth0Client.getProfile().nickname + '/pedidos')
        .then((res) => {
          this.empresasVendedoras(res).map((idEmpresa) => {
              axios.get(process.env.REACT_APP_URLDATABASE+'/usuario/' + auth0Client.getProfile().nickname + '/pedido/' + idEmpresa)
              .then((res) => {
                    this.setState({pedidosSinConfirmar: this.state.pedidosSinConfirmar.concat(res.data)});
                });
          })
        });
    }

    consultarPedidosPendientes(){
        this.setState({pedidosPendientes: []});
        axios.get(process.env.REACT_APP_URLDATABASE+'/usuario/' + auth0Client.getProfile().nickname + '/pedidos')
        .then((res) => {
          this.empresasVendedoras(res).map((idEmpresa) => {
              axios.get(process.env.REACT_APP_URLDATABASE+'/usuario/' + auth0Client.getProfile().nickname + '/pedidosPendiente/' + idEmpresa)
              .then((res) => {
                    this.setState({pedidosPendientes: this.state.pedidosPendientes.concat(res.data)});
                });
          })
        });
    }

    consultarPedidosListos(){
        this.setState({pedidosListos: []});
        axios.get(process.env.REACT_APP_URLDATABASE+'/usuario/' + auth0Client.getProfile().nickname + '/pedidos')
        .then((res) => {
          this.empresasVendedoras(res).map((idEmpresa) => {
              axios.get(process.env.REACT_APP_URLDATABASE+'/usuario/' + auth0Client.getProfile().nickname + '/pedidosListo/' + idEmpresa)
              .then((res) => {
                    this.setState({pedidosListos: this.state.pedidosListos.concat(res.data)});
                });
          })
        });
    }

    render(){
        return(
            <Router>
            <Container>
                <Row>
                    <Col className="col-lg-3">
                        <h1>Menú</h1>
                        <hr/>
                        <div id="collapseOne" className="collapse show mt-2" aria-labelledby="headingOne" data-parent="#accordion">
                            <div class="card-body">
                                <div class="list-group">
                                    <Link to={"/pedidos/carritos"} class="list-group-item">Carrito de compra</Link>
                                    <Link to={"/pedidos/pedidosPendientes"} class="list-group-item">Pedidos pendientes</Link>
                                    <Link to={"/pedidos/pedidosListos"} class="list-group-item">Pedidos listos</Link>    
                                </div>
                            </div>
                        </div>
                    </Col>  
                    <Switch>
                        <Route  path="/pedidos/pedidosPendientes" 
                                render={(props) => <Pedidos {...props} pedidos={this.state.pedidosPendientes} titulo="pendientes"/>}
                        />
                        <Route  path="/pedidos/pedidosListos" 
                                render={(props) => <Pedidos {...props} pedidos={this.state.pedidosListos} titulo="listos"/>}
                        />
                        {console.log(this.state.empresas)}
                        <Route  path="/pedidos/carritos" 
                                render={(props) => <CarritoDeCompra {...props} pedidos={this.state.pedidosSinConfirmar} consultarPedidosSinConfirmar={this.consultarCarritos}/>}
                        />
                    </Switch>
                </Row>
            </Container>
            </Router>
        )
    }
}

export default CarritoUsuarioPanel;