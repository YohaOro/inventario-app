// API Route para Vercel - Productos
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Productos de ejemplo para demostración
    const products = [
      {
        id: 1,
        nombre: 'Laptop HP Pavilion',
        descripcion: 'Laptop de 15 pulgadas con procesador Intel i5',
        cantidad: 10,
        precio: 899.99,
        categoria: 'Electrónicos'
      },
      {
        id: 2,
        nombre: 'Mesa de Oficina',
        descripcion: 'Mesa de escritorio de madera para oficina',
        cantidad: 25,
        precio: 199.99,
        categoria: 'Mobiliario'
      },
      {
        id: 3,
        nombre: 'Café Colombiano',
        descripcion: 'Café premium de grano colombiano',
        cantidad: 50,
        precio: 15.99,
        categoria: 'Alimentos'
      }
    ];
    
    res.status(200).json({
      success: true,
      data: products,
      count: products.length
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
