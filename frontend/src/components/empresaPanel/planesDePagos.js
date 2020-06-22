import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Modal, ModalBody, Label, Input, ModalFooter, Row, Col, Container, Card, CardHeader, CardBody, CardTitle, CardText, CardFooter, Button } from 'reactstrap';

class PlanesDePagos extends Component{

    constructor(props){
        super(props);
        this.state = { 
          
        };
    }
    
    render(){

        return(
              <Container className="container" fluid={true}>
                  <Row>
                        <Col className="text-center">
                            <span className="text-6xl">Precios</span>
                        </Col>
                  </Row>
                  <Row className="mt-6">
                        <Col lg={{size: 3, offset:3}}>
                            <Card>
                                <CardHeader className="text-center" tag="h4">Básico</CardHeader>
                                <CardBody className="text-center">
                                    <CardTitle><span className="text-5xl">$500</span><span> / mes</span></CardTitle>
                                    <CardText>
                                        <svg class="bi bi-caret-right-fill inline-block" color="green" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                        </svg>
                                        <span>Página propia</span>
                                    </CardText>
                                    <CardText>
                                        <svg class="bi bi-caret-right-fill inline-block" color="green" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                        </svg>
                                        <span>Chat privado con el comprador</span>
                                    </CardText>
                                    <CardText>
                                        <svg class="bi bi-caret-right-fill inline-block" color="green" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                        </svg>
                                        <span>Notificaciones vía mail</span>
                                    </CardText>
                                    <CardText>
                                        <svg class="bi bi-caret-right-fill inline-block" color="green" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                        </svg>
                                        <span>Infinitos productos</span>
                                    </CardText>
                                    <CardText>
                                        <svg class="bi bi-caret-right-fill inline-block" color="green" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                        </svg>
                                        <span>1 sucursal</span>
                                    </CardText>
                                    <CardText className="mt-2">
                                        <Button className="w-full text-lg" color="success">Prueba gratis 30 días</Button>
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={{size: 3}}>
                            <Card>
                                <CardHeader className="text-center" tag="h4">Full</CardHeader>
                                <CardBody className="text-center">
                                    <CardTitle><span className="text-5xl">$700</span><span> / mes</span></CardTitle>
                                    <CardText>
                                        <svg class="bi bi-caret-right-fill inline-block" color="green" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                        </svg>
                                        <span>Plan Básico</span>
                                    </CardText>
                                    <CardText>
                                        <svg class="bi bi-caret-right-fill inline-block" color="green" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                        </svg>
                                        <span>Infinitas sucursales</span>
                                    </CardText>
                                    <CardText>
                                        <svg class="bi bi-caret-right-fill inline-block" color="green" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                        </svg>
                                        <span>Soporte vía Whatsapp</span>
                                    </CardText>
                                    <CardText className="mt-2">
                                        <Button className="w-full text-lg" color="success">Prueba gratis 30 días</Button>
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                  </Row>
              </Container>
        )
    }
}

export default PlanesDePagos;