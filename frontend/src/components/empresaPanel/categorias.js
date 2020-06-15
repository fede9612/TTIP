import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import CategoriaModal from './categoriaModal';

class Categorias extends Component{

    constructor(props){
        super(props);
        this.state = { 
            categorias: this.props.empresa.categoriasDeProductos,
            categoriaModal: false
        };
        this.handlerCategoriaModal = this.handlerCategoriaModal.bind(this);
        this.agregarCategoria = this.agregarCategoria.bind(this);
    }

    eliminarCategoria(categoria){
        axios.put('http://localhost:8080/empresa/' + this.props.empresa._id + '/categoria', {categoria: categoria})
        .then((res) => {
            this.props.empresa.categoriasDeProductos = res.data;
            this.setState({categorias: this.props.empresa.categoriasDeProductos});
        })
    }

    handlerCategoriaModal(){
        this.setState({categoriaModal: !this.state.categoriaModal})
    }

    agregarCategoria(categoria){
        let {categorias} = this.state;
        categorias.push(categoria);
        this.setState({categorias: categorias})
    }

    eliminar(categoria){
        let {categorias} = this.state;
        var categoriasNew = [];
        categorias.map((_categoria) =>{
            if(_categoria != categoria){
                categoriasNew.push(_categoria);
            }
        });
        this.setState({categorias: categoriasNew});
    }
    
    render(){
        let categoriasList = <p>No tiene categorías cargadas aún</p>
        if(Array.isArray(this.state.categorias) && this.state.categorias.length){
            categoriasList = this.state.categorias.map((categoria) => {
                            return(
                                <li class="list-group-item">
                                    <button onClick={() => this.eliminarCategoria(categoria)}>
                                        <svg class="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                                            <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
                                        </svg>
                                    </button>
                                    {categoria}
                                </li>
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
                        {categoriasList}
                    </div>
              </div>
        )
    }
}

export default Categorias;