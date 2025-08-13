// API Route para productos - GET (listar) y POST (crear)
export default function handler(req, res) {
  // Configurar CORS para permitir peticiones del frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Datos de ejemplo (simulando base de datos)
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

  // GET - Obtener todos los productos
  if (req.method === 'GET') {
    try {
      res.status(200).json({
        success: true,
        data: products,
        count: products.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error al obtener productos'
      });
    }
  }
  
  // POST - Crear nuevo producto
  else if (req.method === 'POST') {
    try {
      const newProduct = req.body;
      
      // Validar campos requeridos
      if (!newProduct.nombre || !newProduct.cantidad || !newProduct.precio || !newProduct.categoria) {
        return res.status(400).json({
          success: false,
          error: 'Faltan campos requeridos: nombre, cantidad, precio, categoria'
        });
      }

      // Generar nuevo ID
      const newId = Math.max(...products.map(p => p.id)) + 1;
      
      // Crear producto
      const product = {
        id: newId,
        nombre: newProduct.nombre,
        descripcion: newProduct.descripcion || '',
        cantidad: parseInt(newProduct.cantidad),
        precio: parseFloat(newProduct.precio),
        categoria: newProduct.categoria
      };

      // Agregar a la lista (en producción esto iría a una base de datos)
      products.push(product);

      res.status(201).json({
        success: true,
        message: 'Producto creado exitosamente',
        data: product
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error al crear producto'
      });
    }
  }
  
  // Método no permitido
  else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({
      success: false,
      error: `Método ${req.method} no permitido`
    });
  }
}
