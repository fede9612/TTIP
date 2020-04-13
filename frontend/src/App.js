import React, { Component } from 'react';
import axios from 'axios';
import './styles/app.css';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, FormGroup, Label } from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      productos: [],
      nuevoProductoModal: false,
      editarProductoModal: false,
      productoData: {
        nombre: '',
        precio: 0,
        cantidad: 0
      },
      editProductoData: {
        id: '',
        nombre: '',
        precio: 0,
        cantidad: 0
      }
    }
  }

componentWillMount() {
    this.actualizarProductos();
}

toggleNuevoProductoModel(){
  this.setState({
    nuevoProductoModal: ! this.state.nuevoProductoModal
  });
}

actualizarProductos(){
  axios.get('http://localhost:8080/productos')
        .then((res) => {
          this.setState({productos : res.data})
        })     
}

toggleEditarProductoModel(){
  this.setState({
    editarProductoModal: ! this.state.editarProductoModal
  });
}

agregarProducto() {
  axios.post('http://localhost:8080/producto', this.state.productoData).then((res) => {
    let { productos } = this.state
    productos.push(res.data);
    this.setState({ productos, nuevoProductoModal: false,  
      productoData: {
        nombre: '',
        precio: 0,
        cantidad: 0
      } });
  });
}

editarProducto(){
  let {nombre, precio, cantidad} = this.state.editProductoData;
  axios.put('http://localhost:8080/producto/' + this.state.editProductoData.id, {
    nombre, precio, cantidad
  }).then((res) => {
    this.actualizarProductos();
    this.setState({ editarProductoModal: false });
  });
}

//cuando se abre la pantalla modal se cargan los datos en los input desde aquí
editarProductoModalData(producto){
  this.setState({
    editProductoData: {
      id: producto._id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: producto.cantidad
    },
    editarProductoModal: !this.state.editarProductoModal
  });
}

render(){ 
  let listProductos = this.state.productos.map((prod) => {
    return(
      <button className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 mb-2 mr-2 text-left bg-gray-100 hover:bg-gray-300" 
      onClick={this.editarProductoModalData.bind(this, prod)}>
      <div>
        <div>
      <div className="border-r border-b border-l border-t border-gray-700 lg:border-t lg:border-gray-700 rounded-b lg:rounded-b-none lg:rounded-r p-2 flex flex-col justify-between leading-normal">
        <div>
          <p className="text-sm text-gray-600 flex items-center">
            <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
            </svg>
            Producto
          </p>
          <div className="text-gray-900 font-bold text-xl mb-2">{prod.nombre}</div>
        </div>
          <spam className="text-gray-700 text-base">Precio: <spam>{prod.precio}</spam></spam>
          <spam className="text-gray-700 text-base">Cantidad: <spam>{prod.cantidad}</spam></spam>
        <div className="flex items-center">
          
          <div className="text-xs">
            <spam className="text-gray-900 leading-none">Empresa</spam>
            <br></br>
            <spam className="text-gray-600">Nombre empresa</spam>
          </div>
        </div>
      </div>
    </div>
      
      </div>
      </button>
    )
  });

  return (
    <div className="bg-indigo-200">
      
      {this.renderNuevoProductoModal()}
      {this.renderEditarProductoModal()}
      <Button color="primary" onClick={this.toggleNuevoProductoModel.bind(this)}>Agregar Producto</Button>
      <div className="flex flex-wrap justify-center">
          
            {listProductos}
            
      </div>
    </div>
       
    );
  }

  renderNuevoProductoModal() {
    return(
      <div>
        <Modal isOpen={this.state.nuevoProductoModal} toggle={this.toggleNuevoProductoModel.bind(this)}>
          <ModalHeader className="bg-indigo-500" toggle={this.toggleNuevoProductoModel.bind(this)}>Agregar Producto</ModalHeader>
          <ModalBody className="bg-indigo-500">
            <FormGroup>
              <Label for="Nombre">Nombre: </Label>
              <Input id="nombre" value={this.state.productoData.nombre} onChange={(event) =>  {
                let { productoData } = this.state;
                productoData.nombre = event.target.value;
                this.setState({productoData})
              }}/>
            </FormGroup>
            <FormGroup>
              <Label for="Precio">Precio: </Label>
              <Input id="precio" value={this.state.productoData.precio} onChange={(event) =>  {
                let { productoData } = this.state;
                productoData.precio = event.target.value;
                this.setState({productoData})
              }}/>
            </FormGroup>
            <FormGroup>
              <Label for="Cantidad">Cantidad: </Label>
              <Input id="cantidad" value={this.state.productoData.cantidad} onChange={(event) =>  {
                let { productoData } = this.state;
                productoData.cantidad = event.target.value;
                this.setState({productoData})
              }}/>
            </FormGroup>
          </ModalBody>
          <ModalFooter className="bg-indigo-500">
            <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full" onClick={this.agregarProducto.bind(this)}>Agregar</button>
            <button className="bg-gray-700 hover:bg-black text-white font-bold py-2 px-4 rounded-full" onClick={this.toggleNuevoProductoModel.bind(this)}>Cancel</button>
          </ModalFooter>
        </Modal>
        </div>
    );
  }

  renderEditarProductoModal() {
    return(
      <div>
        <Modal isOpen={this.state.editarProductoModal} toggle={this.toggleEditarProductoModel.bind(this)}>
          <ModalHeader className="bg-indigo-500" toggle={this.toggleEditarProductoModel.bind(this)}>Editar Producto</ModalHeader>
          <ModalBody className="bg-indigo-500">
            <FormGroup>
              <Label for="Nombre">Nombre: </Label>
              <Input id="nombre" value={this.state.editProductoData.nombre} onChange={(event) =>  {
                let { editProductoData } = this.state;
                editProductoData.nombre = event.target.value;
                this.setState({editProductoData})
              }}/>
            </FormGroup>
            <FormGroup>
              <Label for="Precio">Precio: </Label>
              <Input id="precio" value={this.state.editProductoData.precio} onChange={(event) =>  {
                 let { editProductoData } = this.state;
                 editProductoData.precio = event.target.value;
                 this.setState({editProductoData})
              }}/>
            </FormGroup>
            <FormGroup>
              <Label for="Cantidad">Cantidad: </Label>
              <Input id="cantidad" value={this.state.editProductoData.cantidad} onChange={(event) =>  {
                 let { editProductoData } = this.state;
                 editProductoData.cantidad = event.target.value;
                 this.setState({editProductoData})
              }}/>
            </FormGroup>
          </ModalBody>
          <ModalFooter className="bg-indigo-500">
            <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full" onClick={this.editarProducto.bind(this)}>Editar</button>
            <button className="bg-gray-700 hover:bg-black text-white font-bold py-2 px-4 rounded-full" onClick={this.toggleEditarProductoModel.bind(this)}>Cancel</button>
          </ModalFooter>
        </Modal>
        </div>
    );
  }
}


export default App;
