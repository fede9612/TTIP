import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import ProductoRowEmpresaPage from "./productoRowEmpresaPage";
import { BrowserRouter as Router, Switch, Route, Link, withRouter} from 'react-router-dom';

class EmpresaPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            id: props.match.params.id,
            empresa: false,
            productos: [],
            categorias: []
        }
        this.getEmpresa = this.getEmpresa.bind(this);
        this.cargarCategorias = this.cargarCategorias.bind(this);
    }

    componentWillMount(){
        this.getEmpresa();
    }

    getEmpresa(){
        axios.get("http://localhost:8080/empresa/" + this.state.id)
        .then((res) => {
            this.setState({empresa: res.data})
            this.state.empresa.locales.map((local) => {
                this.cargarCategorias(local);
                axios.get('http://localhost:8080/local/' + local._id + '/productos/visibles')
                .then((res) => this.setState({productos: this.state.productos.concat(res.data)}));
            })
        });
    }

    cargarCategorias(local){
        var {categorias} = this.state;
        local.categorias.map((categoria) => {
            //Si la categoría no está dentro de la lista de categorias la agrega
            if(categoria != categorias.find((cat) => cat == categoria)){
                categorias.push(categoria);
            }  
        });
        this.setState({categorias: categorias});
    }

    render(){
        // let productos = this.state.productos.map((producto) =>{
        //     return (
        //         <ProductoRowEmpresaPage producto={producto} empresa={this.state.empresa}/>
        //     )
        // })
        return(
            <Router>
            <div>
            <div class="container mt-16">

                <div class="row">

                <div class="col-lg-3">

                    <h1 class="my-4">{this.state.empresa.nombre}</h1>
                    <div class="list-group">
                    {this.state.categorias.map((categoria) =>{
                        return <Link to={"/empresa/" + this.state.empresa._id + "/" + categoria} class="list-group-item">{categoria}</Link>    
                    })}
                    </div>

                </div>
                {/* <!-- /.col-lg-3 --> */}

                <div class="col-lg-9">

                    <div id="carouselExampleIndicators" class="carousel slide my-4" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner" role="listbox">
                        <div class="carousel-item active">
                        <img class="d-block img-fluid" src="http://placehold.it/900x350" alt="First slide"></img>
                        </div>
                        <div class="carousel-item">
                        <img class="d-block img-fluid" src="http://placehold.it/900x350" alt="Second slide"></img>
                        </div>
                        <div class="carousel-item">
                        <img class="d-block img-fluid" src="http://placehold.it/900x350" alt="Third slide"></img>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                    </div>

                    <div class="row">
                        {/* {productos} */}
                        <Switch>
                            {this.state.categorias.map((categoria) =>{
                               return <Route path={"/empresa/:id/" + categoria} render={(props) => <Productos {...props} productos={this.state.productos} empresa={this.state.empresa} categoria={categoria}/>}/>    
                            })}
                        </Switch>
                    </div>
                    {/* <!-- /.row --> */}

                </div>
                {/* <!-- /.col-lg-9 --> */}

                </div>
                {/* <!-- /.row --> */}

            </div>
           
  <footer class="py-5 bg-dark">
    <div class="container">
      <p class="m-0 text-center text-white">Copyright &copy; {this.state.empresa.nombre} 2020</p>
    </div>
    {/* <!-- /.container --> */}
  </footer>
  </div>
  </Router>
        )
    }
}

function Productos(props){
    const productosCategorizados = props.productos.filter((prod) => prod.categoria == props.categoria); 

    return(
        productosCategorizados.map((producto) =>{
            return (
                <ProductoRowEmpresaPage producto={producto} empresa={props.empresa}/>
            )
        })
    );
}

export default EmpresaPage;