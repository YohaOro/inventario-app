#!/usr/bin/env python3
"""
API REST para el Sistema de Gestión de Inventario
Configurado para Vercel
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configuración para Vercel
@app.route('/api/health', methods=['GET'])
def health_check():
    """Endpoint de verificación de salud de la API"""
    return jsonify({
        'status': 'healthy',
        'message': 'API de Inventario funcionando en Vercel',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/products', methods=['GET'])
def get_products():
    """Obtiene todos los productos (simulado para demo)"""
    # Productos de ejemplo para demostración
    products = [
        {
            'id': 1,
            'nombre': 'Laptop HP Pavilion',
            'descripcion': 'Laptop de 15 pulgadas con procesador Intel i5',
            'cantidad': 10,
            'precio': 899.99,
            'categoria': 'Electrónicos'
        },
        {
            'id': 2,
            'nombre': 'Mesa de Oficina',
            'descripcion': 'Mesa de escritorio de madera para oficina',
            'cantidad': 25,
            'precio': 199.99,
            'categoria': 'Mobiliario'
        },
        {
            'id': 3,
            'nombre': 'Café Colombiano',
            'descripcion': 'Café premium de grano colombiano',
            'cantidad': 50,
            'precio': 15.99,
            'categoria': 'Alimentos'
        }
    ]
    
    return jsonify({
        'success': True,
        'data': products,
        'count': len(products)
    })

@app.route('/api/statistics', methods=['GET'])
def get_statistics():
    """Obtiene estadísticas del inventario (simulado para demo)"""
    return jsonify({
        'success': True,
        'data': {
            'total_products': 3,
            'total_value': 1115.97,
            'low_stock_count': 0,
            'low_stock_percentage': 0.0
        }
    })

# Ruta para el frontend
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    """Sirve el frontend de React"""
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(debug=False)
