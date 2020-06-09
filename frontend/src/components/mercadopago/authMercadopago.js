import React, { Component } from "react";
import axios from 'axios';
import auth0Client from "../../Auth";
const qs = require('querystring');

class AuthMercadopago extends Component{

    constructor(props){
        super(props);
        this.state = {
        };
    }

    componentWillMount(){
        this.getAccessTokenVendedor();
    }

    getAccessTokenVendedor(){
        const config ={
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        const body = {
            client_id: '4521684348779774',
            client_secret: 'Md4pT0rvpCYjQnplJmzYqssaTae6Hdxs',
            grant_type: 'authorization_code',
            code: this.props.location.search.split('?code=').join(''),
            redirect_uri: 'http://localhost:3000/autorizado'
        }
        axios.post('https://api.mercadopago.com/oauth/token', qs.stringify(body), config)
        .then(async (res) => {
            await auth0Client.silentAuth();
            // console.log("Respuesta de mercado pago" + res.data.access_token)
            axios.post('http://localhost:8080/mercadopago/vendedor/' + auth0Client.getProfile().nickname, res.data);
        });
    }

    // setRedirect = () => {
    //     this.setState({
    //       redirect: true
    //     })
    // }

    // redirectMercadopago(url){
    //     console.log("url: " + url)
    //     if(this.state.redirect){
    //         return <Link component={() => { 
    //                 window.location.href = url; 
    //                 return null;
    //             }}/>
    //     }
    // }
    
    render(){  
        return(
            <div className="container mt-2">
                <p>Obteniendo token...</p>  
            </div>
        )
    }
}

export default AuthMercadopago;