import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import LocalRow from '../localRow';
import LocalModal from '../localModal';
import CargandoInformacion from '../cargandoInfo';


class Sucursales extends Component{

    constructor(props){
        super(props);
        this.state = { 
            locales: [],
            localModal: false,
            panel: false
        };
        this.handlerLocalModal = this.handlerLocalModal.bind(this);
        this.cargando = this.cargando.bind(this);
        this.cargarPanel = this.cargarPanel.bind(this);
        this.consultarLocales = this.consultarLocales.bind(this);
    }

    componentDidMount(){
        this.cargando();
        this.consultarLocales();
    }

    consultarLocales(){
        //En vez de pasar los locales por props lo hago por acá porque si recargan la página se pierden los props y no aparecen los locales
        axios.get(process.env.REACT_APP_URLDATABASE+'/empresa/' + this.props.location.pathname.split('/empresaPanel/sucursales/').join(''))
        .then((res) => {
            this.setState({locales: res.data.locales}, this.cargarPanel);
        })
    }

    handlerLocalModal(){
        this.setState({localModal: !this.state.localModal})
    }

    cargando(){
        var panel = (
           <CargandoInformacion/>
        )
        this.setState({panel: panel});
    }

    cargarPanel(){
        let localesList; 
        if(Array.isArray(this.state.locales) && this.state.locales.length){
            localesList = this.state.locales.map((local) => {
                            return(
                                <LocalRow local={local} empresa={this.props.empresa}/>
                            );
                        });
        }else{
            localesList = <p>No tiene locales registrados aún</p>
        }
        this.setState({panel: localesList});
    }
    
    render(){
        let localModal;
        if(this.state.localModal){
                localModal = <LocalModal handlerClick={this.handlerLocalModal} empresa={this.props.empresa} consultarLocales={this.consultarLocales}/>     
        }
        return(
              <div>
                  {localModal}
                  <div className="flex">
                    <h4>Sucursales</h4>
                    <button className= {this.state.empresa == false ? "hidden bg-green-500 hover:bg-green-700 text-white font-bold px-2 ml-2 h-7 border-b-4 border-l-4 border-t-4 border-r-4 rounded-full"
                            : "bg-green-500 hover:bg-green-700 text-white font-bold px-2 ml-2 h-7 border-b-4 border-l-4 border-t-4 border-r-4 rounded-full"}
                            onClick={this.handlerLocalModal}>
                        Agregar                
                    </button>
                </div>
                <hr className="w-4/5 mt-1"></hr>
                  {this.state.panel}
              </div>
        )
    }
}

export default Sucursales;