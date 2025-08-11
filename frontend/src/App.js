import React, { useState, useEffect } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import SearchProduct from './components/SearchProduct';
import LowStockReport from './components/LowStockReport';
import apiService from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState('list');
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statistics, setStatistics] = useState(null);

  // Cargar productos desde la API
  useEffect(() => {
    loadProducts();
    loadStatistics();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getProducts();
      setProducts(response.data);
    } catch (err) {
      setError('Error al cargar productos: ' + err.message);
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadStatistics = async () => {
    try {
      const response = await apiService.getStatistics();
      setStatistics(response.data);
    } catch (err) {
      console.error('Error loading statistics:', err);
    }
  };

  const addProduct = async (newProduct) => {
    try {
      setLoading(true);
      const response = await apiService.createProduct(newProduct);
      await loadProducts(); // Recargar productos
      await loadStatistics(); // Recargar estadísticas
      setActiveTab('list');
      return { success: true, message: response.message };
    } catch (err) {
      return { success: false, message: 'Error al crear producto: ' + err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      setLoading(true);
      const { id, ...updateData } = updatedProduct;
      await apiService.updateProduct(id, updateData);
      await loadProducts(); // Recargar productos
      await loadStatistics(); // Recargar estadísticas
      setEditingProduct(null);
      setActiveTab('list');
      return { success: true, message: 'Producto actualizado exitosamente' };
    } catch (err) {
      return { success: false, message: 'Error al actualizar producto: ' + err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      await apiService.deleteProduct(id);
      await loadProducts(); // Recargar productos
      await loadStatistics(); // Recargar estadísticas
      return { success: true, message: 'Producto eliminado exitosamente' };
    } catch (err) {
      return { success: false, message: 'Error al eliminar producto: ' + err.message };
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setActiveTab('edit');
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="card">
          <div className="loading">
            <h3>🔄 Cargando...</h3>
            <p>Conectando con la base de datos...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="card">
          <div className="error-message">
            <h3>❌ Error de Conexión</h3>
            <p>{error}</p>
            <button onClick={loadProducts} className="btn">
              🔄 Reintentar
            </button>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'list':
        return (
          <ProductList 
            products={products} 
            onEdit={startEdit}
            onDelete={deleteProduct}
            statistics={statistics}
          />
        );
      case 'add':
        return <AddProduct onAdd={addProduct} />;
      case 'edit':
        return (
          <EditProduct 
            product={editingProduct} 
            onUpdate={updateProduct}
            onCancel={() => setActiveTab('list')}
          />
        );
      case 'search':
        return <SearchProduct products={products} />;
      case 'report':
        return <LowStockReport products={products} />;
      default:
        return <ProductList products={products} onEdit={startEdit} onDelete={deleteProduct} statistics={statistics} />;
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1>🏪 Sistema de Gestión de Inventario</h1>
        <p>Gestiona tu inventario de manera eficiente y organizada</p>
        {statistics && (
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.1)', 
            padding: '10px 20px', 
            borderRadius: '8px',
            marginTop: '15px'
          }}>
            <span style={{ marginRight: '20px' }}>📦 Total: {statistics.total_products} productos</span>
            <span style={{ marginRight: '20px' }}>💰 Valor: ${statistics.total_value?.toLocaleString() || 0}</span>
            <span>⚠️ Bajo stock: {statistics.low_stock_count}</span>
          </div>
        )}
      </div>

      <div className="container">
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            📋 Lista de Productos
          </button>
          <button 
            className={`nav-tab ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            ➕ Agregar Producto
          </button>
          <button 
            className={`nav-tab ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => setActiveTab('search')}
          >
            🔍 Buscar Producto
          </button>
          <button 
            className={`nav-tab ${activeTab === 'report' ? 'active' : ''}`}
            onClick={() => setActiveTab('report')}
          >
            📊 Reporte Bajo Stock
          </button>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}

export default App;
