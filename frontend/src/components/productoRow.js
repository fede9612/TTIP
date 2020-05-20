import React, { Component } from "react";


class ProductoRow extends Component{

    constructor(props){
        super(props);
        this.state = {
            producto : props.producto
        };
    }

    render(){
        return(
                
            <div className="mt-2 mr-2 border-r border-b border-l border-t border-gray-500 rounded-t rounded-b">
                        <div className="thumbnail mt-2 mr-2 ml-2">
                            <img src="..." alt="..."/>
                            <div className="caption">
                                <h5>{this.state.producto.nombre}</h5>
                                <p>${this.state.producto.precio}<span> stock: {this.state.producto.cantidad}</span></p>
                                <p><a href="#" class="btn btn-primary" role="button">Button</a> <a href="#" class="btn btn-default" role="button">Button</a></p>
                            </div>
                        </div>                
            </div>
        )
    }
}

export default ProductoRow;