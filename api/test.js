// API Route de prueba para Vercel
export default function handler(req, res) {
  res.status(200).json({
    message: 'API Route funcionando correctamente',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url
  });
}
