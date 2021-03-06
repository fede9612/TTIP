import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Row, Col, Container, Card, CardHeader, CardBody, CardTitle, CardText, Button } from 'reactstrap';

class PlanesDePagos extends Component{

    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            redirectPlanBasico: false,
            idPreference: false
        };
        this.habilitarPlanBasico = this.habilitarPlanBasico.bind(this);
        this.suscripcionAPlanBasico = this.suscripcionAPlanBasico.bind(this);
    }

    habilitarPlanBasico(){
        axios.put(process.env.REACT_APP_URLDATABASE+'/usuario/' + this.props.usuario._id + '/plan')
        .then(this.setRedirect());
    }

    suscripcionAPlanBasico(){
        var productos = [{
            nombre: 'Servicio plan básico',
            precio: 500,
            cantidad: 1
        }]
        var reference = `{_id: ${this.props.usuario._id}, diasPendientes: ${this.props.diasPendientes}, plan: true, compra: false}`
        axios.get(process.env.REACT_APP_URLDATABASE+'/usuario/federicoferreyra2')
        .then((res) => {
            axios.post(process.env.REACT_APP_URLDATABASE+'/mercadopago/' + res.data._id, {productos, redirect: `${process.env.REACT_APP_URL}`+"confirmacionPlan", reference})
                .then((res) => {
                    this.setState({idPreference: res.data});
                    this.setRedirectPlanBasico();
                });
        })
    }

    setRedirectPlanBasico(){
        this.setState({redirectPlanBasico: !this.state.redirectPlanBasico});
    }

    redirectPagarPlanBasico(url){
        if(this.state.redirectPlanBasico){
            return <Link component={() => {window.location.href = url; return null;}}/>
        }
    }

    setRedirect(){
        this.setState({redirect: !this.state.redirect});
    }
    
    redirectEmpresaPanel(url){
        if(this.state.redirect){
            return <Link component={() => {window.location.href = url; return null;}}/>
        }
    }

    render(){
        var boton;
        if(Array.isArray(this.props.usuario.pagos) && this.props.usuario.pagos.length){
            boton = <div>
                        <Button className="w-full text-2xl" color="success" onClick={this.suscripcionAPlanBasico}>Suscribirse</Button>
                        {this.redirectPagarPlanBasico(this.state.idPreference)}
                    </div>
        }else{
            boton = <Button className="w-full text-2xl" color="success" onClick={this.habilitarPlanBasico}>Prueba gratis 30 días</Button>
        }
        return(
              <Container className="container" fluid={true}>
                  {this.redirectEmpresaPanel(`${process.env.REACT_APP_URL}`+'empresaPanel')}
                  <Row>
                        <Col className="text-center">
                            <span className="text-6xl">Precio</span>
                        </Col>
                  </Row>
                  <Row className="mt-6">
                        <Col></Col>
                        <Col lg={{size: 6}}>
                            <Card>
                                <CardHeader className="text-center" tag="h4">Básico</CardHeader>
                                <CardBody className="text-center">
                                    <CardTitle><span className="text-5xl">$500</span><span> / mes</span></CardTitle>
                                    <CardText>
                                    <svg class="bi bi-caret-right-fill inline-block" color="green" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                    </svg>
                                    <span className="text-xl">Página propia</span>
                                    </CardText>
                                    <CardText>
                                        <svg class="bi bi-caret-right-fill inline-block" color="green" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                        </svg>
                                        <span className="text-xl">Recibe los pagos con Mercagopago</span>
                                    </CardText>
                                    <CardText>
                                        <svg class="bi bi-caret-right-fill inline-block" color="green" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                        </svg>
                                        <span className="text-xl">Crea productos</span>
                                    </CardText>
                                    <CardText>
                                        <svg class="bi bi-caret-right-fill inline-block" color="green" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                        </svg>
                                        <span className="text-xl">Crea sucursales</span>
                                    </CardText>
                                    <CardText>
                                        <svg class="bi bi-caret-right-fill inline-block" color="green" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                        </svg>
                                        <span className="text-xl">Comparte tu página web por Whatsapp y otras redes sociales</span>
                                    </CardText>
                                    <CardText>
                                        <svg class="bi bi-caret-right-fill inline-block" color="green" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                        </svg>
                                        <span className="text-xl">Chat privado con el vendedor</span>
                                    </CardText>
                                    <CardText>
                                        <svg class="bi bi-caret-right-fill inline-block" color="green" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                        </svg>
                                        <span className="text-xl">Notificaciones vía mail</span>
                                    </CardText>
                                    <CardText>
                                        <svg class="bi bi-caret-right-fill inline-block" color="green" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                        </svg>
                                        <span className="text-xl">Elije el dominio para tu empresa</span>
                                    </CardText>
                                    <CardText className="mt-2">
                                        {boton}
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col></Col>
                  </Row>
              </Container>
        )
    }
}

export default PlanesDePagos;