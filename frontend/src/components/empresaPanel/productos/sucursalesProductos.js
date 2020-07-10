import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ListGroupItem } from 'reactstrap';

class SucursalesProductos extends Component {

    constructor(props){
        super(props);
        this.state = {
            locales: false
        }
    }

    UNSAFE_componentWillMount(){
        this.consultarLocales();
    }

    consultarLocales(){
        axios.get(process.env.REACT_APP_URLDATABASE+'/empresa/' + this.props.empresa._id)
        .then((res) => {
            this.setState({locales: res.data.locales});
        });
    }

    render() {
        var sucursales; 
        if(Array.isArray(this.state.locales) && this.state.locales.length){
           sucursales = this.state.locales.map((local) => {
                return (
                            <div className="inline-block">
                                <button className="btn btn-primary mr-2 mb-2"><Link className="text-white" to={"/productos/"+local._id}>{local.nombre}</Link></button>
                            </div>
                )
            })
        }
        return (
            <div>
                <h4>Productos</h4>
                <hr className="mt-2 mb-3"></hr>
                <div>
                    <ListGroupItem>
                        <span className="text-xl">Agregar productos</span>
                        <p className="p-2">Seleccione una sucursal para cargar su stock</p>                    
                        {sucursales}
                    </ListGroupItem>
                </div>
            </div>
        );
    }
}

export default SucursalesProductos;