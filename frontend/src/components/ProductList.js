import React, { useState, useEffect } from 'react';
import DynamicTable from './DynamicTable';
import DynamicModal from './DynamicModal';
import './TableStyles.css';

const ProductList = React.memo(({ 
  products, 
  onEdit, 
  onDelete, 
  statistics, 
  currentPage, 
  totalProducts, 
  productsPerPage,
  onPreviousPage,
  onNextPage,
  onGoToPage,
  onSearchProduct
}) => {
  console.log('ProductList renderizado con', products?.length, 'productos');
  
  // Debug: Monitorear re-renders
  useEffect(() => {
    console.log('ProductList se montó/re-renderizó');
  });
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [descriptionModal, setDescriptionModal] = useState({ isOpen: false, description: '', productName: '' });
  const [deleteModal, setDeleteModal] = useState({ 
    isOpen: false, 
    productId: null, 
    productName: '',
    showSuccess: false
  });

  const handleDelete = async (product) => {
    console.log('=== handleDelete INICIADO ===');
    console.log('Producto recibido:', product);
    
    const productId = product.id;
    const productName = product.nombre;
    
    console.log('ID extraído:', productId);
    console.log('Nombre extraído:', productName);
    
    // Solo abrir modal de confirmación
    const newModalState = {
      isOpen: true,
      productId: productId,
      productName: productName,
      showSuccess: false
    };
    
    console.log('Estableciendo modal state:', newModalState);
    setDeleteModal(newModalState);
    console.log('=== handleDelete COMPLETADO ===');
  };

  const confirmDelete = async () => {
    const { productId } = deleteModal;
    setDeletingId(productId);
    
    try {
      await onDelete(productId);
      
      console.log('Producto eliminado exitosamente');
      
      // Cerrar modal y mostrar mensaje de éxito
      setDeleteModal({ isOpen: false, productId: null, productName: '', showSuccess: false });
      setMessage({ success: true, message: `Producto "${deleteModal.productName}" eliminado exitosamente` });
      setTimeout(() => setMessage(null), 3000);
      
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      setMessage({ success: false, message: 'Error al eliminar producto' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setDeletingId(null);
    }
  };

  const closeDeleteModal = () => {
    console.log('closeDeleteModal llamado');
    setDeleteModal({ isOpen: false, productId: null, productName: '', showSuccess: false });
    setDeletingId(null);
  };



  // Debug: Monitorear cambios en deleteModal
  useEffect(() => {
    console.log('deleteModal state cambió:', deleteModal);
  }, [deleteModal]);

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
      <h2>📋 Lista de Productos</h2>
      
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
            <h4 style={{ margin: '0 0 5px 0', color: '#28a745' }}>Total Productos</h4>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
              {statistics.total_products}
            </span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#007bff' }}>Valor Total</h4>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>
              ${statistics.total_value?.toLocaleString() || 0}
            </span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#ffc107' }}>Bajo Stock</h4>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>
              {statistics.low_stock_count}
            </span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#6c757d' }}>% Bajo Stock</h4>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#6c757d' }}>
              {statistics.low_stock_percentage}%
            </span>
          </div>
        </div>
      )}
      
      {/* NUEVA TABLA DINÁMICA */}
      <DynamicTable
        data={products}
        columns={[
          {
            key: 'nombre',
            label: 'Nombre del Producto',
            type: 'text',
            width: '25%',
            render: (value, item) => (
              <div className="product-name">
                <strong>{value}</strong>
              </div>
            )
          },
          {
            key: 'descripcion',
            label: 'Descripción',
            type: 'text',
            width: '35%',
            render: (value, item) => (
              <div className="description-cell">
                <span 
                  className="description-text clickable-description"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDescriptionModal({
                      isOpen: true,
                      description: value,
                      productName: item.nombre
                    });
                  }}
                  title="Click para ver descripción completa"
                  style={{ cursor: 'pointer' }}
                >
                  {value.length > 50 ? `${value.substring(0, 50)}...` : value}
                </span>
              </div>
            )
          },
          {
            key: 'cantidad',
            label: 'Stock',
            type: 'quantity',
            width: '10%',
            render: (value, item) => {
              // Usar el mismo sistema de colores que LowStockReport
              let stockClass = 'normal-stock';
              if (value === 0) stockClass = 'no-stock';
              else if (value <= 3) stockClass = 'critical';
              else if (value <= 7) stockClass = 'low';
              else if (value < 10) stockClass = 'warning';
              
              return (
                <span className={`stock-quantity ${stockClass}`}>
                  {value}
                </span>
              );
            }
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
            width: '15%'
          }
        ]}
        showActions={true}
        onEdit={onEdit}
        onDelete={handleDelete}
        emptyMessage="No hay productos registrados"
        className="products-table"
      />
      
      {/* Información de paginación */}
      <div className="pagination-info">
        
        {/* Controles de paginación */}
        <div className="pagination-controls">
          {/* Botón Anterior */}
          <button 
            className="btn btn-secondary pagination-btn"
            onClick={onPreviousPage}
            disabled={currentPage === 1}
          >
            ⬅️ Anterior
          </button>
          
          {/* Números de página */}
          <div className="page-numbers">
            {(() => {
              const totalPages = Math.ceil(totalProducts / productsPerPage);
              const pages = [];
              
              // Mostrar primera página
              if (currentPage > 1) {
                pages.push(
                  <button 
                    key={1} 
                    className="page-number"
                    onClick={() => onGoToPage(1)}
                  >
                    1
                  </button>
                );
                
                if (currentPage > 3) {
                  pages.push(<span key="dots1" className="page-dots">...</span>);
                }
              }
              
              // Mostrar páginas alrededor de la actual
              for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                if (i === 1 || i === totalPages) continue;
                pages.push(
                  <button 
                    key={i} 
                    className={`page-number ${i === currentPage ? 'active' : ''}`}
                    onClick={() => onGoToPage(i)}
                  >
                    {i}
                  </button>
                );
              }
              
              // Mostrar última página
              if (currentPage < totalPages) {
                if (currentPage < totalPages - 2) {
                  pages.push(<span key="dots2" className="page-dots">...</span>);
                }
                
                pages.push(
                  <button 
                    key={totalPages} 
                    className="page-number"
                    onClick={() => onGoToPage(totalPages)}
                  >
                    {totalPages}
                  </button>
                );
              }
              
              return pages;
            })()}
          </div>
          
          {/* Botón Siguiente */}
          <button 
            className="btn btn-secondary pagination-btn"
            onClick={onNextPage}
            disabled={currentPage === Math.ceil(totalProducts / productsPerPage)}
          >
            Siguiente ➡️
          </button>
        </div>
      </div>
      
      {/* Modal de Descripción */}
      <DynamicModal
        type="description"
        isOpen={descriptionModal.isOpen}
        onClose={() => setDescriptionModal({ isOpen: false, description: '', productName: '' })}
        content={descriptionModal.description}
      />

      {/* Modal de Confirmación de Eliminación */}
      <DynamicModal
        type="delete-confirmation"
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        title={`¿Eliminar "${deleteModal.productName}"?`}
        content="¿Estás seguro de que quieres eliminar este producto?"
        actions={
          <>
            <button className="cancel-btn" onClick={closeDeleteModal} disabled={deletingId !== null}>
              Cancelar
            </button>
            <button className="confirm-btn" onClick={confirmDelete} disabled={deletingId !== null}>
              {deletingId !== null ? 'Eliminando...' : 'Eliminar Permanente'}
            </button>
          </>
        }
      />
    </div>
  );
});

export default ProductList;
