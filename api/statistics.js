// API Route para Vercel - Estadísticas
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({
      success: true,
      data: {
        total_products: 3,
        total_value: 1115.97,
        low_stock_count: 0,
        low_stock_percentage: 0.0
      }
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
