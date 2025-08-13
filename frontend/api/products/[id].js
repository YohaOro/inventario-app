// API Route para operaciones individuales de productos
export default function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;
  const productId = parseInt(id);

  // Datos de ejemplo (en producción esto vendría de una base de datos)
  let products = [
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

  // Buscar el producto
  const productIndex = products.findIndex(p => p.id === productId);
  
  if (productIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Producto no encontrado'
    });
  }

  // GET - Obtener producto específico
  if (req.method === 'GET') {
    try {
      res.status(200).json({
        success: true,
        data: products[productIndex]
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error al obtener producto'
      });
    }
  }
  
  // PUT - Actualizar producto
  else if (req.method === 'PUT') {
    try {
      const updateData = req.body;
      
      // Validar campos requeridos
      if (!updateData.nombre || !updateData.cantidad || !updateData.precio || !updateData.categoria) {
        return res.status(400).json({
          success: false,
          error: 'Faltan campos requeridos: nombre, cantidad, precio, categoria'
        });
      }

      // Actualizar producto
      const updatedProduct = {
        ...products[productIndex],
        nombre: updateData.nombre,
        descripcion: updateData.descripcion || '',
        cantidad: parseInt(updateData.cantidad),
        precio: parseFloat(updateData.precio),
        categoria: updateData.categoria
      };

      // Actualizar en la lista (en producción esto iría a una base de datos)
      products[productIndex] = updatedProduct;

      res.status(200).json({
        success: true,
        message: 'Producto actualizado exitosamente',
        data: updatedProduct
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error al actualizar producto'
      });
    }
  }
  
  // DELETE - Eliminar producto
  else if (req.method === 'DELETE') {
    try {
      // Eliminar producto (en producción esto iría a una base de datos)
      const deletedProduct = products.splice(productIndex, 1)[0];

      res.status(200).json({
        success: true,
        message: 'Producto eliminado exitosamente',
        data: deletedProduct
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error al eliminar producto'
      });
    }
  }
  
  // Método no permitido
  else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).json({
      success: false,
      error: `Método ${req.method} no permitido`
    });
  }
}
