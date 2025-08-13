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
  
  // Estado de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  
  // Estado para búsqueda desde descripción truncada
  const [searchFromDescription, setSearchFromDescription] = useState({ term: '', by: 'nombre' });

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

  // Función para obtener productos paginados
  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    
    // Ordenar productos alfabéticamente por nombre
    const sortedProducts = [...products].sort((a, b) => 
      a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
    );
    
    return sortedProducts.slice(startIndex, endIndex);
  };

  // Función para ir a la página anterior
  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  // Función para ir a la página siguiente
  const goToNextPage = () => {
    const maxPage = Math.ceil(products.length / productsPerPage);
    setCurrentPage(prev => Math.min(prev + 1, maxPage));
  };

  // Función para ir a una página específica
  const goToPage = (pageNumber) => {
    const maxPage = Math.ceil(products.length / productsPerPage);
    if (pageNumber >= 1 && pageNumber <= maxPage) {
      setCurrentPage(pageNumber);
    }
  };

  // Función para resetear paginación
  const resetPagination = () => {
    setCurrentPage(1);
  };

  const addProduct = async (newProduct) => {
    try {
      setLoading(true);
      const response = await apiService.createProduct(newProduct);
      await loadProducts(); // Recargar productos
      await loadStatistics(); // Recargar estadísticas
      resetPagination(); // Resetear paginación
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
      resetPagination(); // Resetear paginación
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
      resetPagination(); // Resetear paginación
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

  // Función para buscar producto desde descripción truncada
  const searchProductFromDescription = (productName) => {
    setSearchFromDescription({ term: productName, by: 'nombre' });
    setActiveTab('search');
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
            <button onClick={loadProducts} className="btn" title="Reintentar conexión con el servidor">
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
            products={getPaginatedProducts()} 
            onEdit={startEdit}
            onDelete={deleteProduct}
            statistics={statistics}
            currentPage={currentPage}
            totalProducts={products.length}
            productsPerPage={productsPerPage}
            onPreviousPage={goToPreviousPage}
            onNextPage={goToNextPage}
            onGoToPage={goToPage}
            onSearchProduct={searchProductFromDescription}
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
        return (
          <SearchProduct 
            products={products} 
            initialSearchTerm={searchFromDescription.term}
            initialSearchBy={searchFromDescription.by}
          />
        );
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
          <div className="header-stats">
            <span>📦 Total: {statistics.total_products} productos</span>
            <span>💰 Valor: ${statistics.total_value?.toLocaleString() || 0}</span>
            <span>⚠️ Bajo stock: {statistics.low_stock_count}</span>
          </div>
        )}
      </div>

      <div className="main-layout">
        <div className="sidebar">
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
        </div>

        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;
