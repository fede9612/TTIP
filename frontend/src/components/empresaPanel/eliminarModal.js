import React, { Component } from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';

class EliminarModal extends Component {
    constructor(props){
        super(props);
        this.state = {modal: true}
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.setState({modal: !this.state.modal});
        this.props.changeModal();
    }

    render() {
        return (
            <Modal isOpen={this.state.modal}>
                <ModalBody className="bg-teal-500 content-center">
                    <h5>{this.props.pregunta}</h5>
                </ModalBody>   
                <ModalFooter className="bg-teal-500">
                    <button 
                        className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full" 
                        onClick={() => this.props.eliminarMethod(this.props.eliminarElement)}
                    >Eliminar</button>
                    <button 
                        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full" 
                        onClick={this.toggle}
                    >Cancel</button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default EliminarModal;