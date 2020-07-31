import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import auth0Client from '../../Auth';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroupItem, Button } from 'reactstrap';
import CargandoInformacion from '../cargandoInfo';


class VendedorMercadopago extends Component{

    constructor(props){
        super(props);
        this.state = { 
            redirect: false,
            redirectTerminos: false,
            panel: false
        };
        this.setRedirect = this.setRedirect.bind(this);
    }

    UNSAFE_componentWillMount(){
        this.cargando();
        this.verificarVendedor();
    }

    cargando(){
        var panel = (
           <CargandoInformacion/>
        )
        this.setState({panel: panel});
    }

    verificarVendedor(){
        axios.get(process.env.REACT_APP_URLDATABASE+'/mercadopago/'+auth0Client.getProfile().nickname)
        .then((res) => {
            if(res.status == 200){
                this.panelSuccess();
            }
        })
        .catch((error) => {
            if(error.response.status==400){
                this.panelError();
            }
        });
    }

    setRedirect = () => {
        this.setState({redirect: true});
    }

    setRedirectTerminos = () => {
        this.setState({redirectTerminos: true});
    }

    redirectAuthMercadopago(url){
        if(this.state.redirect){
            return <Link component={() => {window.location.href = url; return null;}}/>
        }
    }

    redirectTerminosMercadopago(url){
        if(this.state.redirectTerminos){
            return <Link component={() => {window.location.href = url; return null;}}/>
        }
    }

    panelError(){
        var panel = <ListGroupItem className="" color="danger">
                    <p className="text-center text-2xl">Usuario aún no configurado</p>
                </ListGroupItem>
        this.setState({panel: panel});
    }

    panelSuccess(){
        var panel = <ListGroupItem className="" color="success">
                    <p className="text-center text-2xl">Usuario configurado correctamente</p>
                </ListGroupItem>
        this.setState({panel: panel});
    }

    render(){
        return(
              <div>
                  <Row>
                      <Col>
                        <h4 className="mb-2">Recibí tus pagos con mercadopago</h4>
                        <hr></hr>
                      </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col>
                        {this.state.panel}
                        <ListGroupItem>
                            <p>
                                Al configurar su cuenta de mercadopago podrás recibir los pagos de las compras realizadas sobre los productos que ofrezcas en tu página web.
                            </p>
                            <p>
                                Para su configuración solo tendrás que hacer click en el botón de configurar mercadopago, luego presionar permitir y listo.
                            </p>    
                            <ListGroupItem color="warning" className="mt-1">
                                <p>    
                                    Al permitir nos dará acceso a que podamos depositar sus ingresos, para más información de los terminos y condiciones haga click 
                                     <Link onClick={this.setRedirectTerminos}> aquí.</Link> No le cobraremos niguna comisión, <span className="text-red-600">toda la ganancia es suya. </span>
                                     Solo se le restará el porcentaje que Mercadopago cobra de comisión de un 4,45% de cada pago acreditado (+ IVA). 
                                     {this.redirectTerminosMercadopago("https://www.mercadopago.com.ar/ayuda/terminos-y-condiciones_299")} 
                                </p>
                            </ListGroupItem>
                            <Row className="mt-3">
                                <Col sm="12" md={{ size: 6, offset: 4 }}>
                                    <Button className="bg-green-600 hover:bg-green-800" size="lg" onClick={this.setRedirect}>Configurar mercadopago</Button>
                                    {this.redirectAuthMercadopago("https://auth.mercadopago.com.ar/authorization?client_id="+ `${process.env.REACT_APP_MARKETPLACE_APP_ID}` +"&response_type=code&platform_id=mp&redirect_uri=" + `${process.env.REACT_APP_URL}` + "autorizado")}  
                                </Col>
                            </Row>
                        </ListGroupItem>
                    </Col>
                  </Row>
              </div>
        )
    }
}

export default VendedorMercadopago;