import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';


class VendedorMercadopago extends Component{

    constructor(props){
        super(props);
        this.state = { 
            redirect: false
        };
        this.setRedirect = this.setRedirect.bind(this);
    }

    setRedirect = () => {
        this.setState({
          redirect: true
        })
    }

    redirectAuthMercadopago(url){
        if(this.state.redirect){
            return <Link component={() => {window.location.href = url; return null;}}/>
        }
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
                  <Row>
                    <Col>
                        <Link onClick={this.setRedirect}>Configurar mercadopago</Link>
                        {this.redirectAuthMercadopago("https://auth.mercadopago.com.ar/authorization?client_id=4521684348779774&response_type=code&platform_id=mp&redirect_uri=http://localhost:3000/autorizado")}  
                    </Col>
                  </Row>
              </div>
        )
    }
}

export default VendedorMercadopago;