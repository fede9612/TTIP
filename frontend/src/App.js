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
      productoData: {
        nombre: '',
        precio: 0,
        cantidad: 0
      }
    }
  }

componentWillMount() {
    axios.get('http://localhost:8080/productos')
        .then((res) => {
          this.setState({productos : res.data})
        })     
}

toggleNuevoProductoModel(){
  this.setState({
    nuevoProductoModal: ! this.state.nuevoProductoModal
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

render(){ 
  let listProductos = this.state.productos.map((prod) => {
    return(
      <tr>
        <td>{prod.id}</td>
        <td>{prod.nombre}</td>
        <td>{prod.precio}</td>
        <td>{prod.cantidad}</td>
        <td>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">
            Editar
          </button>
          <button className="bg-red-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Eliminar
          </button>
        </td>
      </tr>
    )
  });

  return (
    <div>

      <Button color="primary" onClick={this.toggleNuevoProductoModel.bind(this)}>Agregar Producto</Button>
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

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
          </tr>
        </thead>
          
        <tbody>
          {listProductos}
        </tbody>
      </table>
    </div>
       
    );
  }
}

export default App;
