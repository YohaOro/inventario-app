import React from 'react';
import DynamicTable from './DynamicTable';
import './TableStyles.css';

const LowStockReport = React.memo(({ products }) => {
  const lowStockThreshold = 10;
  const lowStockProducts = products.filter(product => product.cantidad < lowStockThreshold);

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { status: 'Sin Stock', className: 'no-stock' };
    if (quantity <= 3) return { status: 'Crítico', className: 'critical' };
    if (quantity <= 7) return { status: 'Bajo', className: 'low' };
    return { status: 'Normal', className: 'normal' };
  };

  if (lowStockProducts.length === 0) {
    return (
      <div className="card">
        <h2>📊 Reporte de Bajo Stock</h2>
        <div className="success-message">
          ✅ ¡Excelente! Todos los productos tienen stock suficiente (más de {lowStockThreshold} unidades).
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>📊 Reporte de Bajo Stock</h2>
      <p>Productos con menos de {lowStockThreshold} unidades en stock:</p>
      
            <DynamicTable
        data={lowStockProducts}
        columns={[
          {
            key: 'nombre',
            label: 'Nombre del Producto',
            type: 'text',
            width: '20%',
            render: (value, item) => (
              <div className="product-name">
                <strong>{value}</strong>
              </div>
            )
          },
          {
            key: 'cantidad',
            label: 'Stock Actual',
            type: 'quantity',
            width: '15%',
            render: (value, item) => {
              // Usar el mismo sistema de colores que ProductList
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
            key: 'cantidad',
            label: 'Estado',
            type: 'text',
            width: '15%',
            render: (value, item) => {
              const stockInfo = getStockStatus(value);
              return (
                <span className={`stock-status ${stockInfo.className}`}>
                  {stockInfo.status}
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
          },
          {
            key: 'cantidad',
            label: 'Acción Recomendada',
            type: 'text',
            width: '20%',
            render: (value, item) => {
              if (value === 0) {
                return (
                  <span className="action-recommendation urgent">
                    ⚠️ Reabastecer URGENTE
                  </span>
                );
              } else if (value <= 3) {
                return (
                  <span className="action-recommendation urgent">
                    🔴 Reabastecer pronto
                  </span>
                );
              } else {
                return (
                  <span className="action-recommendation monitor">
                    🟡 Monitorear stock
                  </span>
                );
              }
            }
          }
        ]}
        showActions={false}
        emptyMessage="No hay productos con bajo stock"
        className="low-stock-table"
      />

      <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h4>📈 Resumen del Reporte:</h4>
        <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
          <li>Total de productos con bajo stock: <strong>{lowStockProducts.length}</strong></li>
          <li>Productos sin stock: <strong>{lowStockProducts.filter(p => p.cantidad === 0).length}</strong></li>
          <li>Productos con stock crítico (≤3): <strong>{lowStockProducts.filter(p => p.cantidad <= 3).length}</strong></li>
          <li>Productos con stock bajo (4-9): <strong>{lowStockProducts.filter(p => p.cantidad > 3 && p.cantidad < 10).length}</strong></li>
        </ul>
      </div>
    </div>
  );
});

export default LowStockReport;
