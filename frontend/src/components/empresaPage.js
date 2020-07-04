import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/pagination.css';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import ProductoRowEmpresaPage from "./productoRowEmpresaPage";
import { Row, Col } from "reactstrap";
import {
    FacebookShareButton,
    WhatsappShareButton,
    TwitterShareButton,
    TelegramShareButton,
    TelegramIcon,
    TwitterIcon,
    FacebookIcon,
    WhatsappIcon
  } from "react-share";
import ProductoPage from "./empresaPage/productoPage";
import ProductosCategorizados from "./empresaPage/productosCategorizados";
import Categoria from "./empresaPage/categoria";

class EmpresaPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            id: props.match.params.id,
            empresa: false,
            productos: [],
            categorias: [],
            mostrarCategorias: false,
            offset: 0,  
            elements: [], 
            perPage: 9, 
            currentPage: 0,
            pageCount: 0,
            redirect: false
        }
        this.getEmpresa = this.getEmpresa.bind(this);
        this.mostrarCategorias = this.mostrarCategorias.bind(this);
    }

    componentWillMount(){
        this.getEmpresa();
    }

    getEmpresa(){
        axios.get(process.env.REACT_APP_URLDATABASE+'/empresa/' + this.state.id)
        .then((res) => {
            this.setState({empresa: res.data});
            this.setState({categorias: res.data.categoriasDeProductos});
            this.state.empresa.locales.map((local) => {
                axios.get(process.env.REACT_APP_URLDATABASE+'/local/' + local._id + '/productos/visibles')
                .then((res) => {
                    this.setState({productos: this.state.productos.concat(res.data), pageCount: Math.ceil(res.data.length / this.state.perPage)});
                    this.setElementsForCurrentPage();
                });
            })
        });
    }

    setElementsForCurrentPage() {
        this.setState({pageCount: Math.ceil(this.state.productos.length / this.state.perPage)})
        let elements = this.state.productos
                      .slice(this.state.offset, this.state.offset + this.state.perPage);
        this.setState({ elements: elements });
    }

    handlePageClick = (data) => {
        const selectedPage = data.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({ currentPage: selectedPage, offset: offset }, () => {
          this.setElementsForCurrentPage();
        });
    }

    mostrarCategorias(){
        this.setState({mostrarCategorias: !this.state.mostrarCategorias});
    }

    render(){
        return(
            <Router>
            <div>
            <div class="container mt-16">

                <div class="row">

                <div class="col-lg-3">
                    <h1 class="my-4">{this.state.empresa.nombre}</h1>
                    <div id="accordion">
                    <div class="card">
                        <div class="card-header" id="headingOne">
                        <h5 class="mb-0">
                            <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" onClick={this.mostrarCategorias}>
                            Categorías
                            </button>
                        </h5>
                        </div>

                        <div id="collapseOne" class={this.state.mostrarCategorias ? "collapse show": "collapse"} aria-labelledby="headingOne" data-parent="#accordion">
                            <div class="card-body">
                                <div class="list-group">
                                    {this.state.categorias.map((categoria) =>{
                                        return <Categoria categoria={categoria} empresa={this.state.empresa}/>    
                                })}
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                   
                </div>
                {/* <!-- /.col-lg-3 --> */}

                <div class="col-lg-9">
                    <div class="row">
                        <Switch>
                            <Route path="/empresa/:idEmpresa/:idProducto" component={ProductoPage}/>
                            <Route path="/empresa/:id" render={(props) => <Productos {...props} empresa={this.state.empresa} pageCount={this.state.pageCount} handlePageClick={this.handlePageClick} currentPage={this.state.currentPage} elements={this.state.elements}/>}/>
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
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
          <p class="text-center text-white">Copyright &copy; {this.state.empresa.nombre} 2020</p>
          </Col>
      </Row>
      
      <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <p className="text-center text-white">Comparte esta página</p>
          </Col>
      </Row>
      <Row className="mt-1">
          <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
                <WhatsappShareButton 
                    url={`${process.env.REACT_APP_URL}`+'empresa/' + this.state.empresa._id} 
                    title={"Visita la página web de " + this.state.empresa.nombre + ", ingresando a esta URL: "}
                >
                    <WhatsappIcon size={32} round={true}/>
                </WhatsappShareButton>
                &nbsp;
                <FacebookShareButton 
                    url={`${process.env.REACT_APP_URL}`+'empresa/' + this.state.empresa._id} 
                    title={"Visita la página web de " + this.state.empresa.nombre + ", ingresando a esta URL: "}
                >
                    <FacebookIcon size={32} round={true}/>
                </FacebookShareButton>
                &nbsp;
                <TwitterShareButton 
                    url={`${process.env.REACT_APP_URL}`+'empresa/' + this.state.empresa._id} 
                    title={"Visita la página web de " + this.state.empresa.nombre + ", ingresando a esta URL: "}
                >
                    <TwitterIcon size={32} round={true}/>
                </TwitterShareButton>
                &nbsp;
                <TelegramShareButton 
                    url={`${process.env.REACT_APP_URL}`+'empresa/' + this.state.empresa._id} 
                    title={"Visita la página web de " + this.state.empresa.nombre + ", ingresando a esta URL: "}
                >
                    <TelegramIcon size={32} round={true}/>
                </TelegramShareButton>
          </Col>
      </Row>
    </div>
    {/* <!-- /.container --> */}
  </footer>
  </div>
  </Router>
        )
    }
}

function Productos(props){ 

    let paginationElement;
    if (props.pageCount > 1) {
        paginationElement = (
            <ReactPaginate
            previousLabel={"<Anterior"}
            nextLabel={"Siguiente>"}
            breakLabel={<span className="gap">...</span>}
            pageCount={props.pageCount}
            onPageChange={props.handlePageClick}
            forcePage={props.currentPage}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            previousLinkClassName={"previous_page"}
            nextLinkClassName={"next_page"}
            disabledClassName={"disabled"}
            activeClassName={"active"}
            />
        );
    }
    var productos;
    productos = props.elements.map(producto => <ProductoRowEmpresaPage producto={producto} empresa={props.empresa}/>)
    return(
        <div>
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
            <Row>
                {paginationElement}
            </Row>
            <Row>
                {productos}
            </Row>
            <Row>
                {paginationElement}
            </Row>
        </div>
    );
    
}



export default EmpresaPage;