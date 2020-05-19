import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class ProductosPanel extends Component{

    constructor(props){
        super(props);
        this.state = { 
            id: props.match.params.id
        };
    }

    
    render(){
        // let localesList = this.state.locales.map((local) => {
        //     return(
        //         <LocalRow local={local} />
        //     );
        // });
        // let localModal;
        // if(this.state.localModal){
        //      localModal = <LocalModal handlerClick={this.handlerLocalModal} consultarEmpresa={this.agregarLocal} empresa={this.state.empresa}/> 
        // }

        return(
            <div className="container mt-2">
                <div class="flex flex-wrap">
                    <div class="w-full lg:w-1/4 ">
                        <h4>Local</h4>
                        <hr className="w-4/5 mt-1"></hr>
                        <p>{ this.state.id }</p>
                    </div>
                    <div class="w-full lg:w-3/4">
                        <div className="flex">
                            <h4>Productos</h4>
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold px-2 ml-2 h-7 border-b-4 border-l-4 border-t-4 border-r-4 rounded-full"
                                    >
                                Agregar                
                            
                            </button>
                        </div>
                        <hr className="w-4/5 mt-1"></hr>
                        
                    </div>
                </div>    
             
            </div>        
        )
    }
}

export default ProductosPanel;