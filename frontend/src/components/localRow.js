import React, { Component } from "react";

class LocalRow extends Component{

    constructor(props){
        super(props);
        this.state = {
            local : props.local
        };
    }

    render(){
        return(
            <div>
                <p>{this.state.local.nombre}</p>
                <span>Carrito de compra</span> <span>Productos</span>
            </div>
        )
    }
}

export default LocalRow;