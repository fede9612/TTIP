import React, { Component } from 'react';
import axios from 'axios';
import './styles/app.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      productos: []
    }
  }

componentWillMount() {
    axios.get('http://localhost:8080/productos')
        .then((res) => {
          this.setState({productos : res.data})
        })

        
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
    <div className="container mx-auto">
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
          {console.log(this.state.productos)}
        </tbody>
      </table>
    </div>
       
    );
  }
}

export default App;
