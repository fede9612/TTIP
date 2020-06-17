import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Col, Row } from "reactstrap";
import auth0Client from "../../Auth";


class ProductoPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            idEmpresa: props.match.params.idEmpresa,
            idProducto: props.match.params.idProducto,
            empresa: false,
            producto: false
        }
        this.agregarProductoAlCarrito = this.agregarProductoAlCarrito.bind(this);
    }

    componentDidMount(){
        this.consultarEmpresaProducto();
    }

    consultarEmpresaProducto(){
        axios.get('http://localhost:8080/empresa/'+this.state.idEmpresa)
        .then((res) => {
           this.setState({empresa: res.data});
           axios.get('http://localhost:8080/producto/id/'+this.state.idProducto).then((res) => this.setState({producto: res.data})); 
        });
    }

    agregarProductoAlCarrito(){
        if(auth0Client.getProfile() == undefined){
            auth0Client.signIn("http://localhost:3000/empresa/" + this.state.empresa._id);
        }else{
            axios.post('http://localhost:8080/usuario/' + this.state.producto.local + '/' + auth0Client.getProfile().nickname + '/pedido', this.state.producto);
        }
    }

    render(){
        return(
            <div className="md:w-full">
                <Row>
                    <Col>
                    <div class="card h-100">
                        <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></img></a>
                        <div class="card-body">
                            <h4 class="card-title">
                                {this.state.producto.nombre}
                            </h4>
                            <h5>${this.state.producto.precio}</h5>
                            <p class="card-text">{this.state.producto.detalle}</p>
                        </div>
                        <div class="card-footer d-flex justify-content-center">
                            <button  type="button" class="btn btn-dark" onClick={this.agregarProductoAlCarrito}><span className="flex ml-4 mr-4">Agregar al carrito&nbsp;
                                <svg class="bi bi-cart w-5 h-6 p-0" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ProductoPage;