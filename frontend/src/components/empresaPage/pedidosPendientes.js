import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class PedidosPendientes extends Component{

    constructor(props){
        super(props);
        this.state = { 
        };
        
    }

    componentDidMount(){
         
    }
    
    // consultarLocal(){
    //     axios.get('http://localhost:8080/local/' + this.state.id)
    //     .then((res) => {
    //       this.setState({local : res.data});
    //     }).then(this.consultarPedidos());
    // }


    render(){
        return(
            <div className="col-12 col-xl-9 col-lg-9 col-sm-9 col-md-9 mt-2">
                <div className="">
                    <div className="box">
                        <h1>Pedidos Pendientes</h1>
                    </div>
                    <div id="accordion" >
                                <div class="card">
                                    <div class="card-header" id="headingOne">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" onClick={this.mostrarLinksPedido}>
                                        Pedidos
                                        </button>
                                    </h5>
                                    </div>

                                    <div id="collapseOne collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                        <div class="card-body">
                                            <div class="table-responsive">
                                                <div class="list-group">
                                                    <table class="table">
                                                        <thead>
                                                            <tr>
                                                                <th>Producto</th>
                                                                <th>Cantidad</th>
                                                                <th>SubTotal</th>
                                                                
                                                            </tr>
                                                        </thead>
                                                        
                                                        <tfoot>
                                                        <tr>
                                                            <th colspan="3"></th>
                                                            
                                                        </tr>
                                                        </tfoot>
                                                    </table>
                                                </div>    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                    </div>
                </div>
            </div>        
        )
    }
}

export default PedidosPendientes;