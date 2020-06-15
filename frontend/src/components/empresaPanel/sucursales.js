import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import LocalRow from '../localRow';
import LocalModal from '../localModal';


class Sucursales extends Component{

    constructor(props){
        super(props);
        this.state = { 
            locales: [],
            localModal: false
        };
        this.handlerLocalModal = this.handlerLocalModal.bind(this);
        this.agregarLocal = this.agregarLocal.bind(this);
    }

    componentDidMount(){
        this.consultarLocales();
    }

    consultarLocales(){
        //En vez de pasar los locales por props lo hago por acá porque si recargan la página se pierden los props y no aparecen los locales
        axios.get('http://localhost:8080/empresa/' + this.props.location.pathname.split('/empresaPanel/sucursales/').join(''))
        .then((res) => {
            this.setState({locales: res.data.locales});
        })
    }

    handlerLocalModal(){
        this.setState({localModal: !this.state.localModal})
    }

    agregarLocal(local){
        let {locales} = this.state;
        locales.push(local);
        console.log(local);
        this.setState({locales: locales})
    }
    
    render(){
        let localesList = <p>No tiene locales registrados aún</p>
        if(Array.isArray(this.state.locales) && this.state.locales.length){
            localesList = this.state.locales.map((local) => {
                            return(
                                <LocalRow local={local} empresa={this.props.empresa}/>
                            );
                        });
        }
        let localModal;
        if(this.state.localModal){
             localModal = <LocalModal handlerClick={this.handlerLocalModal} agregar={this.agregarLocal} empresa={this.props.empresa}/>     
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
                  {localesList}
              </div>
        )
    }
}

export default Sucursales;