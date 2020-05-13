import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import BuscarProductos from "./buscarproductos";
import Productos from "../App";

class Navegacion extends Component{

    constructor(props){
        super(props);
        this.state = {
            menuModal : false
        }
    }

    toggleMenu(){
        this.setState({menuModal: !this.state.menuModal});
    }

    render(){
        return(
            <Router>
                <div>    
                    <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-1">
                    <div class="flex items-center flex-shrink-0 text-white mr-6">
                        <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
                        <span class="font-semibold text-xl tracking-tight">Anydirec</span>
                    </div>
                    <div class="block lg:hidden">
                        <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
                                onClick={this.toggleMenu.bind(this)}
                        >
                        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                        </button>
                    </div>
                    <div class={this.state.menuModal ? "w-full block flex-grow lg:flex lg:items-center lg:w-auto" : "hidden w-full block flex-grow lg:flex lg:items-center lg:w-auto"}>
                        <div class="text-sm lg:flex-grow">
                        <Link to="/buscarproductos" onClick={this.toggleMenu.bind(this)} class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                            Buscar productos
                        </Link>
                        <Link to="/productos" onClick={this.toggleMenu.bind(this)} class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                            Productos
                        </Link>
                        <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                            Locales
                        </a>
                        <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                            Carrito
                        </a>
                        </div>
                        <div>
                        <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Iniciar sesión</a>
                        </div>
                    </div>
                    </nav>
                    <Switch>
                        <Route path="/buscarproductos">
                            <BuscarProductos />
                        </Route>
                        <Route path="/productos">
                            <Productos />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default Navegacion;