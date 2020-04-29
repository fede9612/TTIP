import React, { Component } from 'react';
import '../index.css'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import MapaTools from '../components/mapaTools'

class BuscarProductos extends Component{

    constructor(props){
        super(props);

        this.state = {
            productos: [], //Estos son los productos que trae para el list del input
            productosBuscado: [],
            nombreProducto: '',
            latitude: null,
            longitude: null,
            local: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.getCordinates = this.getCordinates.bind(this);
    }

    componentWillMount(){
      this.getLocation();
    }

    handleSubmit(event){
      event.preventDefault();
      this.buscarProductoSubmit();
    }

   buscarProductoSubmit(){
        axios.get('http://localhost:8080/producto/' + this.state.nombreProducto)
        .then((res) => {
          this.setState({productosBuscado : res.data, nombreProducto:'', productos: []})
        });
    }

    buscar(nombreDelProducto){
        this.setState({
            nombreProducto: nombreDelProducto
        })
        axios.get('http://localhost:8080/producto/' + this.state.nombreProducto)
        .then((res) => {
          this.setState({productos : res.data})
        })     
    }

    calculateDistance(latLocal, longLocal){  
      let mapa = new MapaTools()
      return mapa.calculateDistance(this.state.latitude, this.state.longitude, latLocal, longLocal);
    }

    getLocation(){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.getCordinates);
      } else {
        alert("La geolocalización no es soportada por su navegador.");
      }
    }

    getCordinates(position){
      this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
      })
    }

    listaOrdenadaDeProductos(){
      let self = this;
      let listOrdenada = this.state.productosBuscado.sort(function(a,b){
        if(self.calculateDistance(a.local.latitud, a.local.longitud) < self.calculateDistance(b.local.latitud, b.local.longitud)){
          return a - b;
        }else{
          return b - a;
        }
      });
      return listOrdenada;
    }

    render(){
        let mostrarProductosList = this.state.productos.map((prod) => {
            return(
                <div>
                    <option value={prod.nombre} />
                </div>
            );
        });
       
        let mostrarProductosBuscado = this.listaOrdenadaDeProductos().map((prod) => {
            return(
                <div className="mt-2">
                <div className="border-r border-b border-l border-t border-gray-700 lg:border-t lg:border-gray-700 rounded-b lg:rounded-b-none lg:rounded-r p-2 flex flex-col justify-between leading-normal">
                  <div>
                    <p className="text-sm text-gray-600 flex items-center">
                      <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                      </svg>
                      Producto
                    </p>
                    <div className="text-gray-900 font-bold text-xl mb-2">{prod.nombre}</div>
                  </div>
                    <spam className="text-gray-700 text-base">Precio: <spam>{prod.precio}</spam></spam>
                    <spam className="text-gray-700 text-base">Cantidad: <spam>{prod.cantidad}</spam></spam>
                  <div className="flex items-center">
                    
                    <div className="text-xs">
                    <spam className="text-gray-600">Empresa: {prod.local.nombre} </spam>
                      <br></br>
                      
                      <spam className="text-green-700">Distancia: {this.calculateDistance(prod.local.latitud, prod.local.longitud)} KM</spam>
                    </div>
                  </div>
                </div>
              </div>
            );
        });

        return(
            <div>
            <div className="flex flex-wrap justify-center">
            <form onSubmit={this.handleSubmit}>
                <div className="items-center w-full max-w-xs flex items-center border-b border-b-2 border-teal-500 py-2">
                <input 
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                    type="text" placeholder="Buscar productos"
                    list="productos" autoComplete="off"
                    value={this.state.nombreProducto}
                    onChange={(ev)=>{this.buscar(ev.target.value)}}
                /> 
                <datalist id="productos">
                    {mostrarProductosList}
                </datalist>  
                <button 
                    className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    type="submit">
                    Buscar
                </button>
                </div>
            </form>
            </div>
            <div className="ancho-cuerpo">    
                {mostrarProductosBuscado}
            </div>
            </div>
        );
    }
}

export default BuscarProductos;