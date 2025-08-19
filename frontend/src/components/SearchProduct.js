import React, { useState, useEffect, useCallback } from 'react';
import DynamicTable from './DynamicTable';

function SearchProduct({ products, initialSearchTerm = '', initialSearchBy = 'nombre' }) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [searchBy, setSearchBy] = useState(initialSearchBy);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = useCallback(() => {
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
  }, [searchTerm, searchBy, products]);

  useEffect(() => {
    if (initialSearchTerm) {
      handleSearch();
    }
  }, [initialSearchTerm, initialSearchBy, handleSearch]);

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
        
        <button onClick={handleSearch} className="btn" title="Realizar búsqueda de productos">
          🔍 Buscar
        </button>
      </div>

      {searchResults.length > 0 ? (
        <div>
          <h3>Resultados de búsqueda ({searchResults.length})</h3>
          <DynamicTable
            data={searchResults}
            columns={[
              {
                key: 'nombre',
                label: 'Nombre',
                type: 'text',
                width: '25%',
                render: (value) => <strong>{value}</strong>
              },
              {
                key: 'descripcion',
                label: 'Descripción',
                type: 'text',
                width: '35%'
              },
              {
                key: 'cantidad',
                label: 'Cantidad',
                type: 'quantity',
                width: '15%'
              },
              {
                key: 'precio',
                label: 'Precio',
                type: 'price',
                width: '15%'
              },
              {
                key: 'categoria',
                label: 'Categoría',
                type: 'category',
                width: '10%'
              }
            ]}
            title="Resultados de Búsqueda"
            emptyMessage="No se encontraron productos"
          />
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
