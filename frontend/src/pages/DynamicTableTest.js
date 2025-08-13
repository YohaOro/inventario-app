import React, { useState, useEffect } from 'react';
import DynamicTable from '../components/DynamicTable';
import apiService from '../services/api';
import './DynamicTableTest.css';

const DynamicTableTest = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products');

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
      // Datos de ejemplo si la API falla
      setProducts([
        {
          id: 1,
          nombre: "Sofá de 3 plazas",
          categoria: "Mueblería",
          cantidad: 15,
          precio: 899.99,
          descripcion: "Sofá moderno y cómodo para sala de estar"
        },
        {
          id: 2,
          nombre: "Laptop HP",
          categoria: "Oficina",
          cantidad: 8,
          precio: 1299.99,
          descripcion: "Laptop 15 pulgadas, 8GB RAM"
        },
        {
          id: 3,
          nombre: "Maceta grande",
          categoria: "Jardinería",
          cantidad: 30,
          precio: 45.99,
          descripcion: "Maceta de cerámica 30cm"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Configuración de columnas para productos
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
                alert(`Descripción completa de ${item.nombre}:\n\n${value}`);
              }}
            >
              Ver más
            </button>
          )}
        </div>
      )
    }
  ];

  // Configuración de columnas para estadísticas
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

  // Generar estadísticas
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

  // Datos de ejemplo para diferentes tipos
  const userData = [
    { id: 1, nombre: "Juan Pérez", email: "juan@email.com", rol: "Admin", activo: true, fechaRegistro: "2024-01-15" },
    { id: 2, nombre: "María García", email: "maria@email.com", rol: "Usuario", activo: true, fechaRegistro: "2024-02-20" },
    { id: 3, nombre: "Carlos López", email: "carlos@email.com", rol: "Editor", activo: false, fechaRegistro: "2024-03-10" }
  ];

  const userColumns = [
    { key: 'nombre', label: 'Nombre', type: 'text' },
    { key: 'email', label: 'Email', type: 'text' },
    { key: 'rol', label: 'Rol', type: 'text' },
    { key: 'activo', label: 'Activo', type: 'boolean' },
    { key: 'fechaRegistro', label: 'Fecha Registro', type: 'date' }
  ];

  const transactionData = [
    { id: 1, fecha: "2024-12-15", producto: "Sofá", cantidad: 2, precio: 899.99, estado: "Completado" },
    { id: 2, fecha: "2024-12-14", producto: "Laptop", cantidad: 1, precio: 1299.99, estado: "Pendiente" },
    { id: 3, fecha: "2024-12-13", producto: "Maceta", cantidad: 5, precio: 45.99, estado: "Cancelado" }
  ];

  const transactionColumns = [
    { key: 'fecha', label: 'Fecha', type: 'date' },
    { key: 'producto', label: 'Producto', type: 'text' },
    { key: 'cantidad', label: 'Cantidad', type: 'number' },
    { key: 'precio', label: 'Precio', type: 'price' },
    { key: 'estado', label: 'Estado', type: 'status' }
  ];

  // Funciones de acción
  const handleView = (item) => {
    alert(`Viendo: ${item.nombre || item.producto || 'Elemento'}`);
  };

  const handleEdit = (item) => {
    alert(`Editando: ${item.nombre || item.producto || 'Elemento'}`);
  };

  const handleDelete = (item) => {
    if (confirm(`¿Estás seguro de eliminar ${item.nombre || item.producto || 'este elemento'}?`)) {
      alert(`${item.nombre || item.producto || 'Elemento'} eliminado`);
    }
  };

  const handleRowClick = (item) => {
    alert(`Seleccionado: ${item.nombre || item.producto || 'Elemento'}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="dynamic-table-test-page">
      <div className="page-header">
        <h1>🧪 Página de Prueba - DynamicTable Component</h1>
        <p>Prueba diferentes configuraciones de la tabla dinámica</p>
      </div>

      <div className="tabs-container">
        <button 
          className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          📦 Productos
        </button>
        <button 
          className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          📊 Estadísticas
        </button>
        <button 
          className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 Usuarios
        </button>
        <button 
          className={`tab-button ${activeTab === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          💰 Transacciones
        </button>
        <button 
          className={`tab-button ${activeTab === 'lowStock' ? 'active' : ''}`}
          onClick={() => setActiveTab('lowStock')}
        >
          ⚠️ Bajo Stock
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'products' && (
          <div className="tab-panel">
            <h2>📦 Tabla de Productos con Acciones</h2>
            <p>Esta tabla muestra productos con botones de acción y filas clickeables</p>
            <DynamicTable
              title="Inventario de Productos"
              data={products}
              columns={productColumns}
              showActions={true}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onRowClick={handleRowClick}
              emptyMessage="No hay productos disponibles"
              className="products-table"
            />
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="tab-panel">
            <h2>📊 Estadísticas por Categoría</h2>
            <p>Tabla de estadísticas sin acciones, solo para visualización</p>
            <DynamicTable
              title="Estadísticas por Categoría"
              data={generateStats()}
              columns={statsColumns}
              showActions={false}
              emptyMessage="No hay estadísticas disponibles"
              className="stats-table"
            />
          </div>
        )}

        {activeTab === 'users' && (
          <div className="tab-panel">
            <h2>👥 Lista de Usuarios</h2>
            <p>Tabla con diferentes tipos de datos: boolean, date, text</p>
            <DynamicTable
              title="Usuarios del Sistema"
              data={userData}
              columns={userColumns}
              showActions={true}
              onEdit={handleEdit}
              onDelete={handleDelete}
              emptyMessage="No hay usuarios disponibles"
              className="users-table"
            />
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="tab-panel">
            <h2>💰 Historial de Transacciones</h2>
            <p>Tabla con fechas, precios y estados</p>
            <DynamicTable
              title="Transacciones Recientes"
              data={transactionData}
              columns={transactionColumns}
              showActions={true}
              onView={handleView}
              emptyMessage="No hay transacciones disponibles"
              className="transactions-table"
            />
          </div>
        )}

        {activeTab === 'lowStock' && (
          <div className="tab-panel">
            <h2>⚠️ Productos con Bajo Stock</h2>
            <p>Tabla filtrada mostrando solo productos con stock menor a 10</p>
            <DynamicTable
              title="Productos con Bajo Stock (Menos de 10 unidades)"
              data={products.filter(p => p.cantidad < 10)}
              columns={[
                { key: 'nombre', label: 'Producto', type: 'text' },
                { key: 'cantidad', label: 'Stock Actual', type: 'quantity' },
                { key: 'categoria', label: 'Categoría', type: 'category' },
                { key: 'precio', label: 'Precio', type: 'price' }
              ]}
              showActions={false}
              emptyMessage="Todos los productos tienen stock suficiente"
              className="low-stock-table"
            />
          </div>
        )}
      </div>

      <div className="page-footer">
        <h3>🎯 Características Demostradas:</h3>
        <ul>
          <li>✅ <strong>Reutilizable</strong>: Misma tabla para diferentes tipos de datos</li>
          <li>✅ <strong>Tipos de datos</strong>: text, price, quantity, category, status, date, boolean</li>
          <li>✅ <strong>Acciones configurables</strong>: Ver, editar, eliminar</li>
          <li>✅ <strong>Filas clickeables</strong>: Eventos personalizables</li>
          <li>✅ <strong>Renderers personalizados</strong>: Contenido HTML personalizado</li>
          <li>✅ <strong>Responsive</strong>: Se adapta a diferentes tamaños</li>
          <li>✅ <strong>Estilos consistentes</strong>: Mismo diseño en todas las tablas</li>
        </ul>
      </div>
    </div>
  );
};

export default DynamicTableTest;
