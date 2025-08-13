import React, { useState, useEffect } from 'react';
import DynamicTable from './DynamicTable';
import apiService from '../services/api';

const DynamicTableExample = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await apiService.getProducts();
      setProducts(response.data || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Configuración de columnas para la tabla de productos
  const productColumns = [
    {
      key: 'nombre',
      label: 'Nombre del Producto',
      type: 'text',
      width: '25%'
    },
    {
      key: 'categoria',
      label: 'Categoría',
      type: 'category',
      width: '15%'
    },
    {
      key: 'cantidad',
      label: 'Stock',
      type: 'quantity',
      width: '10%'
    },
    {
      key: 'precio',
      label: 'Precio',
      type: 'price',
      width: '15%'
    },
    {
      key: 'descripcion',
      label: 'Descripción',
      type: 'text',
      width: '35%',
      render: (value, item) => (
        <div className="description-cell">
          <span className="description-text">
            {value.length > 50 ? `${value.substring(0, 50)}...` : value}
          </span>
          {value.length > 50 && (
            <button 
              className="view-more-btn"
              onClick={(e) => {
                e.stopPropagation();
                alert(`Descripción completa: ${value}`);
              }}
            >
              Ver más
            </button>
          )}
        </div>
      )
    }
  ];

  // Configuración de columnas para tabla de estadísticas
  const statsColumns = [
    {
      key: 'categoria',
      label: 'Categoría',
      type: 'category',
      width: '40%'
    },
    {
      key: 'totalProductos',
      label: 'Total Productos',
      type: 'number',
      width: '30%'
    },
    {
      key: 'valorTotal',
      label: 'Valor Total',
      type: 'price',
      width: '30%'
    }
  ];

  // Generar estadísticas de ejemplo
  const generateStats = () => {
    const stats = {};
    products.forEach(product => {
      if (!stats[product.categoria]) {
        stats[product.categoria] = {
          categoria: product.categoria,
          totalProductos: 0,
          valorTotal: 0
        };
      }
      stats[product.categoria].totalProductos += 1;
      stats[product.categoria].valorTotal += product.precio * product.cantidad;
    });
    return Object.values(stats);
  };

  // Funciones de acción
  const handleViewProduct = (product) => {
    alert(`Viendo producto: ${product.nombre}`);
  };

  const handleEditProduct = (product) => {
    alert(`Editando producto: ${product.nombre}`);
  };

  const handleDeleteProduct = (product) => {
    if (window.confirm(`¿Estás seguro de eliminar ${product.nombre}?`)) {
      alert(`Producto ${product.nombre} eliminado`);
    }
  };

  const handleRowClick = (product) => {
    alert(`Producto seleccionado: ${product.nombre} - Precio: $${product.precio}`);
  };

  if (loading) {
    return <div className="loading">Cargando productos...</div>;
  }

  return (
    <div className="dynamic-table-example">
      <h2>Ejemplos de Tabla Dinámica</h2>
      
      {/* Tabla de productos con acciones */}
      <DynamicTable
        title="Inventario de Productos"
        data={products}
        columns={productColumns}
        showActions={true}
        onView={handleViewProduct}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        onRowClick={handleRowClick}
        emptyMessage="No hay productos disponibles"
        className="products-table"
      />

      {/* Tabla de estadísticas sin acciones */}
      <DynamicTable
        title="Estadísticas por Categoría"
        data={generateStats()}
        columns={statsColumns}
        showActions={false}
        emptyMessage="No hay estadísticas disponibles"
        className="stats-table"
      />

      {/* Tabla de productos con bajo stock */}
      <DynamicTable
        title="Productos con Bajo Stock (Menos de 10 unidades)"
        data={products.filter(p => p.cantidad < 10)}
        columns={[
          { key: 'nombre', label: 'Producto', type: 'text' },
          { key: 'cantidad', label: 'Stock Actual', type: 'quantity' },
          { key: 'categoria', label: 'Categoría', type: 'category' }
        ]}
        showActions={false}
        emptyMessage="Todos los productos tienen stock suficiente"
        className="low-stock-table"
      />
    </div>
  );
};

export default DynamicTableExample;
