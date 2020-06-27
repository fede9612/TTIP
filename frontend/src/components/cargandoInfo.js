import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Spinner, Row, Col } from 'reactstrap';

class CargandoInformacion extends Component{

    constructor(props){
        super(props);
    }

    render(){

        return(
            <Row className="mt-4">
                <Col className="text-center">
                    <p className="text-3xl mb-2"> Cargando información... </p>
                    <Spinner className="text-lg" color="success" />
                </Col>
            </Row>
        )
    }
}

export default CargandoInformacion;