import React, { Component } from "react";
import axios from 'axios';
import auth0Client from "../../Auth";
import imgLoading from '../../styles/img/loading.svg';
import { Link } from "react-router-dom";
const qs = require('querystring');

class AuthMercadopago extends Component{

    constructor(props){
        super(props);
        this.state = {
            redirect: false
        };
        this.setRedirect = this.setRedirect.bind(this);
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
            axios.post('http://localhost:8080/mercadopago/vendedor/' + auth0Client.getProfile().nickname, res.data).then(this.setRedirect());
        });
    }

    setRedirect = () => {
        this.setState({
          redirect: true
        })
    }

    redirectEmpresaPanel(){
        if(this.state.redirect){
            return <Link component={() => { 
                    window.location.href = 'http://localhost:3000/empresaPanel'; 
                    return null;
                }}/>
        }
    }
    
    render(){  
        return(
            <div className="mt-2">
            {this.redirectEmpresaPanel()}
                <div className="d-flex justify-content-center"><h1>Espere, obteniendo token...</h1></div>
                <div className="d-flex justify-content-center"><img className="w-4/5 sm:w-3/12" src={imgLoading}></img></div>
            </div>
        )
    }
}

export default AuthMercadopago;