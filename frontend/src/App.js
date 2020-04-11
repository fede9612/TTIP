import React from 'react';
import './styles/app.css';

function App() {
  
  state = {
    productos: []
  }
  
 
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
          <tr>
            <td>1</td>
            <td>Libro</td>
            <td>400</td>
            <td>4</td>
            <td>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">
                Editar
              </button>
              <button className="bg-red-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
     
      
  );
}

export default App;
