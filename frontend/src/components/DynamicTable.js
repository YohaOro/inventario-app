import React from 'react';
import './DynamicTable.css';

const DynamicTable = ({ 
  data, 
  columns, 
  title, 
  emptyMessage = "No hay datos para mostrar",
  onRowClick,
  showActions = false,
  onEdit,
  onDelete,
  onView,
  className = ""
}) => {
  // Función para renderizar el contenido de una celda
  const renderCellContent = (item, column) => {
    const value = item[column.key];
    
    // Si la columna tiene un renderer personalizado, usarlo
    if (column.render) {
      return column.render(value, item);
    }
    
    // Renderizado por defecto según el tipo de dato
    switch (column.type) {
      case 'price':
        return `$${parseFloat(value).toFixed(2)}`;
      case 'quantity':
        return (
          <span className={`quantity-badge ${value < 10 ? 'low-stock' : 'normal-stock'}`}>
            {value}
          </span>
        );
      case 'category':
        return (
          <span className="category-badge" style={{ backgroundColor: getCategoryColor(value) }}>
            {value}
          </span>
        );
      case 'status':
        return (
          <span className={`status-badge ${value.toLowerCase()}`}>
            {value}
          </span>
        );
      case 'date':
        return new Date(value).toLocaleDateString();
      case 'boolean':
        return value ? '✅ Sí' : '❌ No';
      default:
        return value;
    }
  };

  // Función para obtener color de categoría
  const getCategoryColor = (category) => {
    const colors = {
      'Mueblería': '#FF6B6B',
      'Oficina': '#4ECDC4',
      'Jardinería': '#45B7D1',
      'Tecnología': '#96CEB4',
      'Hogar': '#FFEAA7',
      'Deportes': '#DDA0DD',
      'Ropa': '#98D8C8',
      'Libros': '#F7DC6F'
    };
    return colors[category] || '#95A5A6';
  };

  // Función para manejar clic en fila
  const handleRowClick = (item) => {
    if (onRowClick) {
      onRowClick(item);
    }
  };

  return (
    <div className={`dynamic-table-container ${className}`}>
      {title && (
        <div className="table-header">
          <h3 className="table-title">{title}</h3>
        </div>
      )}
      
      {data && data.length > 0 ? (
        <div className="table-wrapper">
          <table className="dynamic-table">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th 
                    key={index} 
                    className={`table-header-cell ${column.className || ''}`}
                    style={{ width: column.width || 'auto' }}
                  >
                    {column.label}
                  </th>
                ))}
                {showActions && (
                  <th className="table-header-cell actions-header">Acciones</th>
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((item, rowIndex) => (
                <tr 
                  key={item.id || rowIndex} 
                  className={`table-row ${onRowClick ? 'clickable' : ''}`}
                  onClick={() => handleRowClick(item)}
                >
                  {columns.map((column, colIndex) => (
                    <td 
                      key={colIndex} 
                      className={`table-cell ${column.className || ''}`}
                    >
                      {renderCellContent(item, column)}
                    </td>
                  ))}
                  {showActions && (
                    <td className="table-cell actions-cell">
                      <div className="action-buttons">
                        {onView && (
                          <button 
                            className="action-btn view-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              onView(item);
                            }}
                            title="Ver detalles"
                          >
                            👁️
                          </button>
                        )}
                        {onEdit && (
                          <button 
                            className="action-btn edit-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              onEdit(item);
                            }}
                            title="Editar"
                          >
                            ✏️
                          </button>
                        )}
                        {onDelete && (
                          <button 
                            className="action-btn delete-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDelete(item);
                            }}
                            title="Eliminar"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <p className="empty-message">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};

export default DynamicTable;
