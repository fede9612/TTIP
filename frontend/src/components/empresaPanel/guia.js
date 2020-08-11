import React, { Component } from 'react';
import { Row, Col, Container, ListGroupItem } from 'reactstrap';

class Guia extends Component {

    render() {
        return (
            <Container>
                <Row className="text-center mt-4">
                    <Col>
                        <ListGroupItem>
                            <span className="text-5xl font-home-page">Configuraciones iniciales</span>
                            <div className="flex justify-center -mt-3 mb-3">
                                <hr className="w-8/12 bg-green-400"></hr>
                            </div>
                            <div class="embed-responsive embed-responsive-16by9">
                                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/1-WqH-wwApY?rel=0" 
                                        allowfullscreen="allowfullscreen"
                                        mozallowfullscreen="mozallowfullscreen" 
                                        msallowfullscreen="msallowfullscreen" 
                                        oallowfullscreen="oallowfullscreen" 
                                        webkitallowfullscreen="webkitallowfullscreen">    
                                </iframe>
                            </div>
                        </ListGroupItem>
                    </Col>    
                </Row>
                <Row className="text-center mt-4">
                    <Col>
                        <ListGroupItem>
                            <span className="text-5xl font-home-page">Agrega productos a tu página web</span>
                            <div className="flex justify-center -mt-3 mb-3">
                                <hr className="w-8/12 bg-green-400"></hr>
                            </div>
                            <div class="embed-responsive embed-responsive-16by9">
                                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/wJzDc6yuB7Y?rel=0" 
                                        allowfullscreen="allowfullscreen"
                                        mozallowfullscreen="mozallowfullscreen" 
                                        msallowfullscreen="msallowfullscreen" 
                                        oallowfullscreen="oallowfullscreen" 
                                        webkitallowfullscreen="webkitallowfullscreen">    
                                </iframe>
                            </div>
                        </ListGroupItem>
                    </Col>    
                </Row>
                <Row className="text-center mt-4 mb-5">
                    <Col>
                        <ListGroupItem>
                            <span className="text-5xl font-home-page">Comparte tu página web y productos</span>
                            <div className="flex justify-center -mt-3 mb-3">
                                <hr className="w-8/12 bg-green-400"></hr>
                            </div>
                            <div class="embed-responsive embed-responsive-16by9">
                                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/sBBxCkLaKKE?rel=0" 
                                        allowfullscreen="allowfullscreen"
                                        mozallowfullscreen="mozallowfullscreen" 
                                        msallowfullscreen="msallowfullscreen" 
                                        oallowfullscreen="oallowfullscreen" 
                                        webkitallowfullscreen="webkitallowfullscreen">    
                                </iframe>
                            </div>
                        </ListGroupItem>
                    </Col>    
                </Row>      
            </Container>
        );
    }
}

export default Guia;