import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Modal, ModalBody, Label, Input, ModalFooter, Row, Col, Container, Card, CardHeader, CardBody, CardTitle } from 'reactstrap';

class PlanesDePagos extends Component{

    constructor(props){
        super(props);
        this.state = { 
          
        };
    }
    
    render(){

        return(
              <Container>
                  <Row>
                        <Col sm={{size: 3, offset:2}}>
                            <Card>
                                <CardHeader tag="h4">Básico</CardHeader>
                                <CardBody>
                                    <CardTitle><h1>500</h1></CardTitle>
                                </CardBody>
                            </Card>
                        </Col>
                  </Row>
              </Container>
        )
    }
}

export default PlanesDePagos;