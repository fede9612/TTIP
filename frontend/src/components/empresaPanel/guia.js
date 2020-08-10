import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';

class Guia extends Component {

    render() {
        return (
            <Container>
                <Row className="text-center mt-4">
                    <Col>
                        <span className="text-5xl font-home-page">Configuraciones iniciales</span>
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/1-WqH-wwApY?rel=0" 
                                    allowfullscreen="allowfullscreen"
                                    mozallowfullscreen="mozallowfullscreen" 
                                    msallowfullscreen="msallowfullscreen" 
                                    oallowfullscreen="oallowfullscreen" 
                                    webkitallowfullscreen="webkitallowfullscreen">    
                            </iframe>
                        </div>
                    </Col>    
                </Row>          
            </Container>
        );
    }
}

export default Guia;