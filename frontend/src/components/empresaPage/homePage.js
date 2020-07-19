import React, { Component } from 'react';
import { Row, Col, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class HomePage extends Component {
    render() {
        return (
            <div className="bg-gray-100">
                <div className="container">
                    <Row className="text-center">
                        <Col className="mt-3" md={{size: 6, offset:3}}>
                            <h1 className="text-5xl font-home-page -mb-2">Crea tu propia página web</h1>
                            <h1 className="text-5xl font-home-page">para tu negocio</h1>
                        </Col>
                    </Row>
                    <Row>
                        <div className="col-sm text-center" xs={{size:12}} sm={{size:6}}>
                            <span className="text-5xl">Servicios</span>
                            <div className="flex justify-center -mt-1 mb-2">
                                <hr className="w-8/12 bg-green-400"></hr>
                            </div>
                            <CardBody className="text-left rounded-l rounded-r bg-gray-200 w-full ">
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
                                <CardText>
                                    <svg class="bi bi-caret-right-fill inline-block" color="green" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                    </svg>
                                    <span className="text-xl">Soporte vía Whatsapp</span>
                                </CardText>
                                <CardText className="mt-2 text-center">
                                    <Link to="/empresaPanel"><Button className="w-full text-2xl" color="success">Prueba gratis 30 días</Button></Link>
                                </CardText>
                            </CardBody>
                        </div>
                        <div className="d-flex align-items-center col-sm">
                            <div className="text-center">
                                <span className="text-3xl font-home-page">Haz crecer tus ventas regionales localizando tu local en el mapa</span><br></br>
                                <span className="text-2xl font-home-page">al buscar productos las personas encontraran los locales cercanos a su zona</span>    
                            </div>
                        </div>
                    </Row>
                    <Row className="mt-10 mb-8">
                        <Col className="text-center bg-gray-200 rounded-l rounded-r p-5">
                            <span className="text-3xl font-home-page">
                                Luego de los 30 días de prueba puedes renovar tu suscripción por <strong class="text-green-600">solo $500</strong> mensuales.
                            </span><br></br>
                            <span className="text-3xl font-home-page">
                                <strong className="text-green-600">No cobramos comisión por venta</strong>, solo la mensualidad
                            </span>
                        </Col>
                    </Row>
                </div>
                {/* <div className="bg-gray-100 h-64">
                    
                </div> */}
            </div>
        );
    }
}

export default HomePage;