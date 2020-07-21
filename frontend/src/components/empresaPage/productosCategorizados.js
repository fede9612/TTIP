import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/pagination.css'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Row, Col } from "reactstrap";
import ProductoRowEmpresaPage from "../productoRowEmpresaPage";
import Categoria from "./categoria";
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, TelegramShareButton, TelegramIcon } from "react-share";

class ProductosCategorizados extends Component{

    constructor(props){
        super(props);
        this.state = {
            aliasEmpresa: props.match.params.alias,
            categoria: props.match.params.categoria,
            empresa: false,
            productos: [],
            offset: 0,  
            elements: [], 
            perPage: 9, 
            currentPage: 0,
            pageCount: 0,
            mostrarCategorias: false,
            categorias: []
        }
        this.setElementsForCurrentPage = this.setElementsForCurrentPage.bind(this);
        this.mostrarCategorias = this.mostrarCategorias.bind(this);
    }

    componentWillMount(){
        this.getProductos();
    }

    getProductos(){
        axios.get(process.env.REACT_APP_URLDATABASE+'/empresa/alias/' + this.state.aliasEmpresa)
        .then((res) => {
            this.setState({empresa: res.data});
            this.setState({categorias: res.data.categoriasDeProductos});
            this.state.empresa.locales.map((local) => {
                axios.get(process.env.REACT_APP_URLDATABASE+'/local/' + local._id + '/productos/visibles')
                .then((res) => {
                    var productosCategorizados = []; 
                    res.data.map((prod) => {
                        if(prod.categoria == decodeURI(this.state.categoria)){
                            productosCategorizados.push(prod);
                        }
                    })
                    this.setState({productos: this.state.productos.concat(productosCategorizados), pageCount: Math.ceil(productosCategorizados.length / this.state.perPage)});
                    this.setElementsForCurrentPage();
                });
            })
        });
    }

    setElementsForCurrentPage() {
        console.log(this.state.productos)
        this.setState({pageCount: Math.ceil(this.state.productos.length / this.state.perPage)})
        let elements = this.state.productos
                        .slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({elements: elements});
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
        let productos;
        productos = this.state.elements.map((producto) =>{
                        return (
                            <ProductoRowEmpresaPage producto={producto} empresa={this.state.empresa}/>
                        )
                    })
        let paginationElement;
        if (this.state.pageCount > 1) {
            paginationElement = (
                <ReactPaginate
                previousLabel={"<Anterior"}
                nextLabel={"Siguiente>"}
                breakLabel={<span className="gap">...</span>}
                pageCount={this.state.pageCount}
                onPageChange={this.handlePageClick}
                forcePage={this.state.currentPage}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                previousLinkClassName={"previous_page"}
                nextLinkClassName={"next_page"}
                disabledClassName={"disabled"}
                activeClassName={"active"}
                />
            );
        }
        return(
            <div>
            <div className="container">
                <Row className="mt-16">
                    <div class="col-lg-3 mt-4">
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
                    <div class="col-lg-9">
                        <div className="w-full">
                            <h1 class="my-5 text-5xl text-center font-nombre-empresa">{this.state.empresa.nombre}</h1>
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
                    </div>
                </Row>
            </div>
            <footer class="mt-10 py-5 bg-dark">
                <div className="container">
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
                                url={`${process.env.REACT_APP_URL}`+'empresa/' + this.state.empresa.alias} 
                                title={"Visita la página web de " + this.state.empresa.nombre + ", ingresando a esta URL: "}
                            >
                                <WhatsappIcon size={32} round={true}/>
                            </WhatsappShareButton>
                            &nbsp;
                            <FacebookShareButton 
                                url={`${process.env.REACT_APP_URL}`+'empresa/' + this.state.empresa.alias} 
                                title={"Visita la página web de " + this.state.empresa.nombre + ", ingresando a esta URL: "}
                            >
                                <FacebookIcon size={32} round={true}/>
                            </FacebookShareButton>
                            &nbsp;
                            <TwitterShareButton 
                                url={`${process.env.REACT_APP_URL}`+'empresa/' + this.state.empresa.alias} 
                                title={"Visita la página web de " + this.state.empresa.nombre + ", ingresando a esta URL: "}
                            >
                                <TwitterIcon size={32} round={true}/>
                            </TwitterShareButton>
                            &nbsp;
                            <TelegramShareButton 
                                url={`${process.env.REACT_APP_URL}`+'empresa/' + this.state.empresa.alias} 
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
        );
    }
}

export default ProductosCategorizados;