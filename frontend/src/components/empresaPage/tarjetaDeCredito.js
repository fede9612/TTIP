import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import visa from "../../styles/img/tarjetas/visa.png";
import masterCard from "../../styles/img/tarjetas/mastercard.png";
import bancoProvincia from "../../styles/img/tarjetas/bancoProvincia.jpg";
import rapipago from "../../styles/img/tarjetas/rapipago.jpg";
import pagoFacil from "../../styles/img/tarjetas/pagoFacil.jpg";
import redLink from "../../styles/img/tarjetas/redLink.png";
import mercadopago from "../../styles/img/tarjetas/mercadopago.jpeg";
import americanExpress from "../../styles/img/tarjetas/americanExpress.jpg";
import naranja from "../../styles/img/tarjetas/naranja.png";


class TarjetaDeCredito extends Component{

    constructor(props){
        super(props);
        this.state = {
            name:props.name
        }
    }

    render(){
        let tarjeta;
         if(this.state.name == "Visa"){
            tarjeta = (<div className="mr-1"><img className="border-gray-600 border-t border-r border-b border-l mx-auto d-block img-fluid w-16 h-8" src={visa}></img></div>)
        }
        if(this.state.name == "Mastercard"){
            tarjeta = (<div className="mr-1"><img className="border-gray-600 border-t border-r border-b border-l mx-auto d-block img-fluid w-16 h-8" src={masterCard}></img></div>)                      
        }
        if(this.state.name == "Provincia NET Pagos"){
            tarjeta = (<div className="mr-1"><img className="border-gray-600 border-t border-r border-b border-l mx-auto d-block img-fluid w-16 h-8" src={bancoProvincia}></img></div>)                                
        }
        if(this.state.name == "Rapipago"){
            tarjeta = (<div className="mr-1"><img className="border-gray-600 border-t border-r border-b border-l mx-auto d-block img-fluid w-16 h-8" src={rapipago}></img></div>)                         
        }
        if(this.state.name == "Pago Fácil"){
            tarjeta = (<div className="mr-1"><img className="border-gray-600 border-t border-r border-b border-l mx-auto d-block img-fluid w-16 h-8" src={pagoFacil}></img></div>)                    
        }
        if(this.state.name == "Red Link"){
            tarjeta = (<div className="mr-1"><img className="border-gray-600 border-t border-r border-b border-l mx-auto d-block img-fluid w-16 h-8" src={redLink}></img></div>)                           
        }
        if(this.state.name == "Red Link"){
            tarjeta = (<div className="mr-1"><img className="border-gray-600 border-t border-r border-b border-l mx-auto d-block img-fluid w-16 h-8" src={mercadopago}></img></div>)                          
        }
        if(this.state.name == "Red Link"){
            tarjeta = (<div className="mr-1"><img className="border-gray-600 border-t border-r border-b border-l mx-auto d-block img-fluid w-16 h-8" src={mercadopago}></img></div>)                          
        }
        if(this.state.name == "American Express"){
            tarjeta = (<div className="mr-1"><img className="border-gray-600 border-t border-r border-b border-l mx-auto d-block img-fluid w-16 h-8" src={americanExpress}></img></div>)                          
        }
        if(this.state.name == "Naranja"){
            tarjeta = (<div className="mr-1"><img className="border-gray-600 border-t border-r border-b border-l mx-auto d-block img-fluid w-16 h-8" src={naranja}></img></div>)                          
        }
        return(
            <div className="inline-block mt-2">
                {tarjeta}
            </div>
        )
    }
}

export default TarjetaDeCredito;