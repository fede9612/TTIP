import React, { Component } from "react";
import axios from 'axios';
import auth0Client from '../Auth';
import { Link } from "react-router-dom";

class ProductoRowEmpresaPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            producto: props.producto,
            empresa: props.empresa,
            redirect: false
        };
        this.agregarProductoAlCarrito = this.agregarProductoAlCarrito.bind(this);
        this.setRedirect = this.setRedirect.bind(this);
        this.redirectSelf = this.redirectSelf.bind(this);
    }

    agregarProductoAlCarrito(){
        if(auth0Client.getProfile() == undefined){
            auth0Client.signIn(`${process.env.REACT_APP_URL}`+"empresa/" + this.state.empresa._id);
        }else{
            axios.post('http://localhost:8080/usuario/' + this.state.producto.local + '/' + auth0Client.getProfile().nickname + '/pedido', this.state.producto);
        }
    }

    setRedirect(){
        this.setState({redirect: !this.state.redirect});
    }

    redirectSelf(url){
        if(this.state.redirect){
            return <Link component={() => {window.location.href = url; return null;}}/>
        }
    }

    render(){
        return(
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100">
                <img class="card-img-top" src={this.props.producto.imgUrl ? this.props.producto.imgUrl : "http://placehold.it/700x400"} alt=""></img>
                <div class="card-body">
                    <h4 class="card-title">
                    <Link 
                        to={"/empresa/"+this.state.empresa._id+"/"+this.props.producto._id} 
                        onClick={this.setRedirect}>{this.props.producto.nombre}
                    </Link>
                    {this.redirectSelf("/empresa/"+this.state.empresa._id+"/"+this.props.producto._id)}
                    </h4>
                    <h5>${this.props.producto.precio}</h5>
                    <p class="card-text">{this.props.producto.detalle ? this.props.producto.detalle : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!" }</p>
                </div>
                <div class="card-footer d-flex justify-content-center">
                    <button  type="button" class="btn btn-dark" onClick={this.agregarProductoAlCarrito}><span className="flex ml-4 mr-4">Agregar al carrito&nbsp;
                        <svg class="bi bi-cart w-5 h-6 p-0" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                        </svg>
                        </span>
                    </button>
                </div>
                </div>
            </div>
        )
    }
}

export default ProductoRowEmpresaPage;