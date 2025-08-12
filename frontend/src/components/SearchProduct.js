import React, { useState, useEffect } from 'react';

function SearchProduct({ products, initialSearchTerm = '', initialSearchBy = 'nombre' }) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [searchBy, setSearchBy] = useState(initialSearchBy);
  const [searchResults, setSearchResults] = useState([]);

  // Efecto para realizar búsqueda automática si hay término inicial
  useEffect(() => {
    if (initialSearchTerm) {
      handleSearch();
    }
  }, [initialSearchTerm, initialSearchBy]);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const filtered = products.filter(product => {
      const term = searchTerm.toLowerCase();
      
      switch (searchBy) {
        case 'nombre':
          return product.nombre.toLowerCase().includes(term);
        case 'categoria':
          return product.categoria.toLowerCase().includes(term);
        case 'descripcion':
          return product.descripcion.toLowerCase().includes(term);
        default:
          return product.nombre.toLowerCase().includes(term);
      }
    });

    setSearchResults(filtered);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="card">
      <h2>🔍 Buscar Productos</h2>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <select
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
          className="form-control"
          style={{ width: 'auto' }}
        >
          <option value="nombre">Por Nombre</option>
          <option value="categoria">Por Categoría</option>
          <option value="descripcion">Por Descripción</option>
        </select>
        
        <input
          type="text"
          placeholder="Escribe tu búsqueda..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="form-control"
          style={{ flex: 1 }}
        />
        
        <button onClick={handleSearch} className="btn">
          🔍 Buscar
        </button>
      </div>

      {searchResults.length > 0 ? (
        <div>
          <h3>Resultados de búsqueda ({searchResults.length})</h3>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Categoría</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td><strong>{product.nombre}</strong></td>
                  <td>{product.descripcion}</td>
                  <td>{product.cantidad}</td>
                  <td>${product.precio.toFixed(2)}</td>
                  <td>{product.categoria}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : searchTerm && searchResults.length === 0 ? (
        <div className="empty-state">
          <h3>🔍 No se encontraron resultados</h3>
          <p>Intenta con otros términos de búsqueda</p>
        </div>
      ) : (
        <div className="empty-state">
          <h3>🔍 Inicia una búsqueda</h3>
          <p>Escribe en el campo de búsqueda para encontrar productos</p>
        </div>
      )}
    </div>
  );
}

export default SearchProduct;
