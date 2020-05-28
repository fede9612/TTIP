import React, { Component } from 'react';
import '../index.css'
import '../styles/fonts.css'
import 'bootstrap/dist/css/bootstrap.css';
import imgSearch from '../styles/img/search.svg' 
import axios from 'axios';
import MapaTools from '../components/mapaTools'
import ProductoRowBuscarProductos from './productoRowBuscarProductos';

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
        this.calculateDistance = this.calculateDistance.bind(this);
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
          return -1;
        }else{
          return 1;
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
                <ProductoRowBuscarProductos producto={prod} calculateDistance={this.calculateDistance}/>
            );
        });

        return(
            <div>
            <div className="flex flex-wrap justify-center bg-green-200">
                <div className="p-6 mx-auto max-w-4xl flex justify-center items-center">
                  <div className="flex-2"> 
                    <h2>¿Estás buscando un producto y no sabes donde encontrarlo?</h2> 
                  </div>
                    <img className="imgSearch h-40" src={imgSearch}></img>
                </div>
                <div className="flex justify-center w-full">
                  <h3>Te ayudamos con ello</h3>    
                </div>
            <form onSubmit={this.handleSubmit}>
                <div className="items-center w-full max-w-xs flex border-b border-b-2 border-teal-500 py-2">
                  <input 
                      className="appearance-none bg-transparent border-none w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none" 
                      type="text" placeholder="Buscar productos                    2"
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
                <div className="mb-6"></div>
            </form>
            </div>
            <div className="ancho-cuerpo mb-2">    
                {mostrarProductosBuscado}
            </div>
            </div>
        );
    }
}

export default BuscarProductos;