import React, { useState } from 'react';

function ProductList({ products, onEdit, onDelete, statistics }) {
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setDeletingId(id);
      try {
        const result = await onDelete(id);
        setMessage(result);
        setTimeout(() => setMessage(null), 3000);
      } catch (error) {
        setMessage({ success: false, message: 'Error al eliminar producto' });
        setTimeout(() => setMessage(null), 3000);
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (!products || products.length === 0) {
    return (
      <div className="card">
        <div className="empty-state">
          <h3>📦 No hay productos registrados</h3>
          <p>Comienza agregando tu primer producto al inventario</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>📋 Lista de Productos ({products.length})</h2>
      
      {message && (
        <div className={message.success ? 'success-message' : 'error-message'}>
          {message.message}
        </div>
      )}
      
      {statistics && (
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '15px', 
          borderRadius: '8px', 
          marginBottom: '20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#28a745' }}>📦 Total Productos</h4>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
              {statistics.total_products}
            </span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#007bff' }}>💰 Valor Total</h4>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>
              ${statistics.total_value?.toLocaleString() || 0}
            </span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#ffc107' }}>⚠️ Bajo Stock</h4>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>
              {statistics.low_stock_count}
            </span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#6c757d' }}>📊 % Bajo Stock</h4>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#6c757d' }}>
              {statistics.low_stock_percentage}%
            </span>
          </div>
        </div>
      )}
      
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td><strong>{product.nombre}</strong></td>
              <td>{product.descripcion}</td>
              <td>
                <span style={{ 
                  color: product.cantidad < 10 ? '#dc3545' : '#28a745',
                  fontWeight: 'bold'
                }}>
                  {product.cantidad}
                </span>
              </td>
              <td>${product.precio.toFixed(2)}</td>
              <td>
                <span className="category-badge">{product.categoria}</span>
              </td>
              <td>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => onEdit(product)}
                  style={{ marginRight: '8px', padding: '8px 16px' }}
                >
                  ✏️ Editar
                </button>
                <button 
                  className="btn btn-danger" 
                  onClick={() => handleDelete(product.id)}
                  disabled={deletingId === product.id}
                  style={{ padding: '8px 16px' }}
                >
                  {deletingId === product.id ? '🔄 Eliminando...' : '🗑️ Eliminar'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
