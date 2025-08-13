import React from 'react';
import CategoryBadge from './CategoryBadge';
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
      
      <table className="product-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Stock Actual</th>
            <th>Estado</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Acción Recomendada</th>
          </tr>
        </thead>
        <tbody>
          {lowStockProducts.map((product) => {
            const stockInfo = getStockStatus(product.cantidad);
            return (
              <tr key={product.id}>
                <td><strong>{product.nombre}</strong></td>
                <td>
                  <span className={`stock-quantity ${stockInfo.className}`}>
                    {product.cantidad}
                  </span>
                </td>
                <td>
                  <span className={`stock-status ${stockInfo.className}`}>
                    {stockInfo.status}
                  </span>
                </td>
                <td>${product.precio.toFixed(2)}</td>
                <td>
                  <CategoryBadge category={product.categoria} size="small" />
                </td>
                <td>
                  {product.cantidad === 0 ? (
                    <span className="action-recommendation urgent">
                      ⚠️ Reabastecer URGENTE
                    </span>
                  ) : product.cantidad <= 3 ? (
                    <span className="action-recommendation soon">
                      🔴 Reabastecer pronto
                    </span>
                  ) : (
                    <span className="action-recommendation monitor">
                      🟡 Monitorear stock
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

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
