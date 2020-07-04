import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Col, Row, Button, ListGroupItem, ListGroup } from "reactstrap";
import auth0Client from "../../Auth";
import TarjetaDeCredito from "./tarjetaDeCredito";
import { Link } from "react-router-dom";
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, TelegramShareButton, TelegramIcon } from "react-share";
import ProductoRowEmpresaPage from "../productoRowEmpresaPage";


class ProductoPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            idEmpresa: props.match.params.idEmpresa,
            idProducto: props.match.params.idProducto,
            empresa: false,
            producto: false,
            productos: [],
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
        axios.get(process.env.REACT_APP_URLDATABASE+'/empresa/'+this.state.idEmpresa)
        .then((res) => {
           this.setState({empresa: res.data});
           axios.get(process.env.REACT_APP_URLDATABASE+'/producto/id/'+this.state.idProducto)
           .then((res) => {
               this.setState({producto: res.data})
               this.consultarProductos();
            }); 
        });
    }

    consultarProductos(){
        this.state.empresa.locales.map((local) => {
            axios.get(process.env.REACT_APP_URLDATABASE+'/local/' + local._id + '/productos/visibles')
            .then((res) => this.setState({productos: this.state.productos.concat(res.data)}));
        })
    }

    getMedioDePagosMercadolibre(){
        axios.get('https://api.mercadolibre.com/sites/MLA/payment_methods?marketplace=NONE')
        .then((res) => this.setState({mediosDePago: res.data}));
    }

    agregarProductoAlCarrito(){
        if(auth0Client.getProfile() == undefined){
            auth0Client.signIn(`${process.env.REACT_APP_URL}`+"empresa/" + this.state.empresa._id);
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
                    <div class="card h-100 bg-gray-100">
                        <img class="card-img-top" src={this.state.producto.imgUrl ? this.state.producto.imgUrl : "http://placehold.it/700x400"} alt=""></img>
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
                                    <hr className="bg-gray-500 mt-3"/>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
                                        <p className="text-xl mb-1">Comparte este producto</p>
                                        <WhatsappShareButton 
                                            url={`${process.env.REACT_APP_URL}`+'empresa/' + this.state.empresa._id + "/" + this.state.producto._id} 
                                            title={this.state.producto.nombre + " en la página de " + this.state.empresa.nombre}
                                        >
                                            <WhatsappIcon size={32} round={true}/>
                                        </WhatsappShareButton>
                                        &nbsp;
                                        <FacebookShareButton 
                                            url={`${process.env.REACT_APP_URL}`+'empresa/' + this.state.empresa._id + "/" + this.state.producto._id} 
                                            title={this.state.producto.nombre + " en la página de " + this.state.empresa.nombre}
                                        >
                                            <FacebookIcon size={32} round={true}/>
                                        </FacebookShareButton>
                                        &nbsp;
                                        <TwitterShareButton 
                                            url={`${process.env.REACT_APP_URL}`+'empresa/' + this.state.empresa._id + "/" + this.state.producto._id} 
                                            title={this.state.producto.nombre + " en la página de " + this.state.empresa.nombre}
                                        >
                                            <TwitterIcon size={32} round={true}/>
                                        </TwitterShareButton>
                                        &nbsp;
                                        <TelegramShareButton 
                                            url={`${process.env.REACT_APP_URL}`+'empresa/' + this.state.empresa._id + "/" + this.state.producto._id} 
                                            title={this.state.producto.nombre + " en la página de " + this.state.empresa.nombre}
                                        >
                                            <TelegramIcon size={32} round={true}/>
                                        </TelegramShareButton>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    </Col>
                </Row>
                <Row className="mt-4 mb-3">
                    <Col>
                        <ListGroup>
                            <ListGroupItem className="bg-dark text-white text-lg">Productos Relacionados</ListGroupItem> 
                            <ListGroupItem>
                                <ProductosRelacionados 
                                    productos={this.state.productos.filter((prod) => prod._id != this.state.producto._id)} 
                                    categoria={this.state.producto.categoria} empresa={this.state.empresa}/>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
            </div>
        )
    }
}

function ProductosRelacionados(props){
    const productosRelacionados = props.productos.filter((prod) => prod.categoria == props.categoria).slice(0, 6);
    let productos;
    productos = productosRelacionados.map((producto) =>{
                    return (
                        <ProductoRowEmpresaPage producto={producto} empresa={props.empresa}/>
                    )
                })
    return(
        <div className="w-full">
            <Row>
                {productos}
            </Row>
        </div>
    );
}

export default ProductoPage;