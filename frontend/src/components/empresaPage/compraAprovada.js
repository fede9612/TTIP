import React, { Component } from "react";
import imgConfirmed from '../../styles/img/confirmed.svg';
import auth0Client from "../../Auth";

class CompraAprovada extends Component{

    constructor(props){
        super(props);
        this.state = {
        };
    }

    async componentWillMount(){
        await auth0Client.silentAuth();
    }
    
    render(){  
        return(
            <div className="container mt-20">
                <div className="d-flex justify-content-center"><h1>Se acreditó su pago, muchas gracias por su compra</h1></div>
                <div className="d-flex justify-content-center mt-4">
                    <img className="w-1/4" src={imgConfirmed}></img> 
                </div>
            </div>
        )
    }
}

export default CompraAprovada;