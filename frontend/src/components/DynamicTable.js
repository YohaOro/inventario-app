import React from 'react';
import CategoryBadge from './CategoryBadge';
import TooltipPortal from './TooltipPortal';
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
        return <CategoryBadge category={value} size="small" />;
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
                    data-column={column.key}
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
                      data-column={column.key}
                    >
                      {renderCellContent(item, column)}
                    </td>
                  ))}
                  {showActions && (
                    <td className="table-cell actions-cell">
                      <div className="action-buttons">
                        {onView && (
                          <TooltipPortal content="Ver detalles del producto" position="top">
                            <button 
                              className="action-btn view-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                onView(item);
                              }}
                            >
                              👁️
                            </button>
                          </TooltipPortal>
                        )}
                        {onEdit && (
                          <TooltipPortal content="Editar producto" position="top">
                            <button 
                              className="action-btn edit-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                onEdit(item);
                              }}
                            >
                              ✏️
                            </button>
                          </TooltipPortal>
                        )}
                        {onDelete && (
                          <TooltipPortal content="Eliminar producto permanentemente" position="top">
                            <button 
                              className="action-btn delete-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDelete(item);
                              }}
                            >
                              🗑️
                            </button>
                          </TooltipPortal>
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
