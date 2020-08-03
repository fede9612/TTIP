import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import imgThanks from '../../../styles/img/thanks.svg'
import { Row, Col, Container, } from 'reactstrap';

class ConfirmacionCompraPlan extends Component{

    constructor(props){
        super(props);
        this.state = {
        };
    }

    render(){
        console.log(window.location.search.split('?collection_id=').join('').substring(0,10))
        return(
              <Container className="container" fluid={true}>
                  <Row>
                        <Col className="text-center">
                            <span className="text-6xl">Gracias por su suscripción</span>
                        </Col>
                  </Row>
                  <Row className="mt-6">
                        <Col className="text-center">
                            <span><img className="h-64 inline" src={imgThanks}></img></span>
                        </Col>
                  </Row>
              </Container>
        )
    }
}

export default ConfirmacionCompraPlan;