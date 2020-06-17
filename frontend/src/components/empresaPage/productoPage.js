import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Col, Row, Button } from "reactstrap";
import auth0Client from "../../Auth";
import TarjetaDeCredito from "./tarjetaDeCredito";
import { Link } from "react-router-dom";


class ProductoPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            idEmpresa: props.match.params.idEmpresa,
            idProducto: props.match.params.idProducto,
            empresa: false,
            producto: false,
            mediosDePago: [],
            redirectMediosDePago: false
        }
        this.agregarProductoAlCarrito = this.agregarProductoAlCarrito.bind(this);
        this.setRedirectMediosDePago = this.setRedirectMediosDePago.bind(this);
    }

    componentDidMount(){
        this.consultarEmpresaProducto();
        this.getMedioDePagosMercadolibre();
    }

    consultarEmpresaProducto(){
        axios.get('http://localhost:8080/empresa/'+this.state.idEmpresa)
        .then((res) => {
           this.setState({empresa: res.data});
           axios.get('http://localhost:8080/producto/id/'+this.state.idProducto).then((res) => this.setState({producto: res.data})); 
        });
    }

    getMedioDePagosMercadolibre(){
        axios.get('https://api.mercadolibre.com/sites/MLA/payment_methods?marketplace=NONE')
        .then((res) => this.setState({mediosDePago: res.data}));
    }

    agregarProductoAlCarrito(){
        if(auth0Client.getProfile() == undefined){
            auth0Client.signIn("http://localhost:3000/empresa/" + this.state.empresa._id);
        }else{
            axios.post('http://localhost:8080/usuario/' + this.state.producto.local + '/' + auth0Client.getProfile().nickname + '/pedido', this.state.producto);
        }
    }

    setRedirectMediosDePago(){
        this.setState({redirectMediosDePago: !this.state.redirectMediosDePago});
    }

    redirectMediosDePago(url){
        if(this.state.redirectMediosDePago){
            return <Link component={() => {window.location.href = url; return null;}}/>
        }
    }    

    render(){
        let mediosDePago = this.state.mediosDePago.map((pago) => {
            return (
                <TarjetaDeCredito name={pago.name}/>
            )
        });
        return(
            <div className="md:w-full mt-3 mb-2">
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
                            <Row className="mt-4">
                                <Col>
                                <strong>Medios de pago</strong>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col>
                                    <hr className="bg-gray-500 mb-3"/>
                                    {mediosDePago}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Link onClick={this.setRedirectMediosDePago}>Ver todos los medios de pago</Link>
                                    {this.redirectMediosDePago('https://www.mercadopago.com.ar/ayuda/medios-de-pago-y-promociones_264')}
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="text-center">
                                    <hr className="bg-gray-500 mb-3"/>
                                    <Button color="danger" size="xl" block onClick={this.agregarProductoAlCarrito}><p className="text-xl">Agregar al carrito</p></Button>    
                                </Col>
                            </Row>
                        </div>
                    </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ProductoPage;