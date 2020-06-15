import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import CategoriaModal from './categoriaModal';

class Categorias extends Component{

    constructor(props){
        super(props);
        this.state = { 
            categorias: [],
            categoriaModal: false
        };
        this.handlerCategoriaModal = this.handlerCategoriaModal.bind(this);
        this.agregarCategoria = this.agregarCategoria.bind(this);
    }

    componentDidMount(){
        this.setState({categorias: this.props.empresa.categoriasDeProductos})
    }

    // consultarLocales(){
        // En vez de pasar los locales por props lo hago por acá porque si recargan la página se pierden los props y no aparecen los locales
        // axios.get('http://localhost:8080/empresa/' + this.props.location.pathname.split('/empresaPanel/sucursales/').join(''))
        // .then((res) => {
            // this.setState({locales: res.data.locales});
        // })
    // }

    handlerCategoriaModal(){
        this.setState({categoriaModal: !this.state.categoriaModal})
    }

    agregarCategoria(categoria){
        let {categorias} = this.state;
        categorias.push(categoria);
        this.setState({categorias: categorias})
    }
    
    render(){
        let categoriasList = <p>No tiene categorías cargadas aún</p>
        if(Array.isArray(this.state.categorias) && this.state.categorias.length){
            categoriasList = this.state.categorias.map((categoria) => {
                            return(
                                <p># {categoria}</p>
                            );
                        });
        }
        let categoriaModal;
        if(this.state.categoriaModal){
             categoriaModal = <CategoriaModal handlerClick={this.handlerCategoriaModal} agregar={this.agregarCategoria} empresa={this.props.empresa}/>     
        }

        return(
              <div>
                  {categoriaModal}
                  <div className="flex">
                    <h4>Categorias</h4>
                    <button className= {"bg-green-500 hover:bg-green-700 text-white font-bold px-2 ml-2 h-7 border-b-4 border-l-4 border-t-4 border-r-4 rounded-full"}
                            onClick={this.handlerCategoriaModal}>
                        Agregar                
                    </button>
                </div>
                <hr className="w-4/5 mt-1"></hr>
                    <div className="mt-2">
                        <p>Las categorías de productos sirven para ordenar y separar sus productos logrando así una busqueda más rápida. En su página web los clientes
                            prodrán buscar sus productos separados por las categorías que usted defina aquí.
                        </p>
                    </div>
                    <div className="mt-1">
                        <h5>Categorias</h5>
                        {categoriasList}
                    </div>
              </div>
        )
    }
}

export default Categorias;