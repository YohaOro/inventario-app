// API Route para estadísticas del inventario
export default function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Solo permitir GET
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({
      success: false,
      error: `Método ${req.method} no permitido`
    });
    return;
  }

  try {
    // Datos de ejemplo (en producción esto vendría de una base de datos)
    const products = [
      {
        id: 1,
        nombre: "Laptop Dell XPS 13",
        descripcion: "Laptop ultrabook de 13 pulgadas con procesador Intel i5",
        cantidad: 5,
        precio: 1299.99,
        categoria: "Tecnología"
      },
      {
        id: 2,
        nombre: "Mouse inalámbrico Logitech",
        descripcion: "Mouse ergonómico con sensor óptico de alta precisión",
        cantidad: 15,
        precio: 29.99,
        categoria: "Accesorios"
      },
      {
        id: 3,
        nombre: "Silla de oficina ergonómica",
        descripcion: "Silla con respaldo ajustable y soporte lumbar",
        cantidad: 20,
        precio: 299.99,
        categoria: "Oficina"
      },
      {
        id: 4,
        nombre: "Sofá de 3 plazas",
        descripcion: "Sofá moderno con tapizado de tela resistente",
        cantidad: 8,
        precio: 899.99,
        categoria: "Hogar"
      },
      {
        id: 5,
        nombre: "Pelota de fútbol profesional",
        descripcion: "Pelota oficial FIFA con válvula de aire",
        cantidad: 25,
        precio: 89.99,
        categoria: "Deportes"
      }
    ];

    // Calcular estadísticas
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, product) => sum + (product.precio * product.cantidad), 0);
    const lowStockCount = products.filter(product => product.cantidad <= 10).length;
    
    // Productos por categoría
    const productsByCategory = products.reduce((acc, product) => {
      acc[product.categoria] = (acc[product.categoria] || 0) + 1;
      return acc;
    }, {});

    // Productos con bajo stock
    const lowStockProducts = products.filter(product => product.cantidad <= 10);

    // Valor por categoría
    const valueByCategory = products.reduce((acc, product) => {
      acc[product.categoria] = (acc[product.categoria] || 0) + (product.precio * product.cantidad);
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      data: {
        total_products: totalProducts,
        total_value: Math.round(totalValue * 100) / 100,
        low_stock_count: lowStockCount,
        products_by_category: productsByCategory,
        value_by_category: valueByCategory,
        low_stock_products: lowStockProducts,
        average_price: Math.round((totalValue / totalProducts) * 100) / 100,
        total_items: products.reduce((sum, product) => sum + product.cantidad, 0)
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener estadísticas'
    });
  }
}
