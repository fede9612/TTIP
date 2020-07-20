import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Row, Col, Alert } from 'reactstrap';
import axios from 'axios';
import Map from "./local/map";

class LocalModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            local:{
                nombre: "",
                direccion: "",
                mail: "",
                productos: [],
                carritosDePedidos: [],
                latitud: "",
                longitud: ""
            },
            empresa: props.empresa,
            modal: true,
            errorInput: false
        };
        this.toggle = this.toggle.bind(this);
        this.agregarLocal = this.agregarLocal.bind(this);
        this.cargarLatYLong = this.cargarLatYLong.bind(this);
        this.lanzarErrorInput = this.lanzarErrorInput.bind(this);
    }

    toggle(){
        console.log(process.env.REACT_APP_URLDATABASE+'/empresa/'+ this.state.empresa._id +'/local');
        this.setState({modal: !this.state.modal})
        this.props.handlerClick();
    }

    agregarLocal(){
        axios.post(process.env.REACT_APP_URLDATABASE+'/empresa/'+ this.state.empresa._id +'/local', this.state.local)
        .then((res) => {
            this.props.agregar(res.data);
            this.props.consultarLocales();
        })
        .then(this.toggle());
    }

    cargarLatYLong(lat, long){
        this.state.local.latitud = lat;
        this.state.local.longitud = long; 
    }

    lanzarErrorInput(){
        console.log("entro")
        this.setState({errorInput: true});
    }

    render(){
        var errorInput;
        if(this.state.errorInput){
          errorInput = <Alert color="danger">Seleccione una opción de la lista, no necesita presionar enter</Alert>
        }
        return(
            <div>
                <Modal isOpen={this.state.modal}>
                    <ModalHeader className="bg-teal-500">Nueva sucursal</ModalHeader>
                    <ModalBody className="bg-teal-500">
                        <Label for="Nombre">Nombre: </Label>
                        <Input id="nombre" value={this.state.local.nombre} onChange={(event) =>  {
                            let { local } = this.state;
                            local.nombre = event.target.value;
                            this.setState({local})
                        }}/>
                        <Label for="Nombre">Dirección: </Label>
                        <Input id="nombre" value={this.state.local.direccion} onChange={(event) =>  {
                            let { local } = this.state;
                            local.direccion = event.target.value;
                            this.setState({local})
                        }}/>
                        <Label className="mt-3" for="Mapa">Busque una dirección y arrastre el puntero hasta la localización de su local </Label>
                        {errorInput}
                        <Row className="mt-2 mb-24">
                            <Col>
                                <Map
                                    google={this.props.google}
                                    center={{lat: -34.60254489046751, lng: -58.38109651818849}}
                                    height='300px'
                                    zoom={13}
                                    cargarLatYLong={this.cargarLatYLong}
                                    lanzarErrorInput={this.lanzarErrorInput}
                                />
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter className="bg-teal-500">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" onClick={this.agregarLocal}>Agregar</button>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full" onClick={this.toggle}>Cancel</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default LocalModal;