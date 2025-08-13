#!/usr/bin/env python3
"""
API REST para el Sistema de Gestión de Inventario
Proporciona endpoints para todas las operaciones CRUD de productos
"""

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Permitir CORS para el frontend

# Configuración de la base de datos SQLite
DB_PATH = os.path.join(os.path.dirname(__file__), '..', 'inventario.db')

def get_db_connection():
    """Crea y retorna una conexión a la base de datos SQLite"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def dict_from_row(row):
    """Convierte una fila de SQLite en un diccionario"""
    return dict(zip(row.keys(), row))

def init_database():
    """Inicializa la base de datos si no existe"""
    if not os.path.exists(DB_PATH):
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Crear tabla de productos
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS productos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                descripcion TEXT,
                cantidad INTEGER DEFAULT 0,
                precio REAL DEFAULT 0.0,
                categoria TEXT DEFAULT 'Sin categoría',
                fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Insertar productos de ejemplo de todas las categorías
        productos_ejemplo = [
            ('Laptop Dell XPS 13', 'Laptop ultrabook de 13 pulgadas', 5, 1299.99, 'Tecnología'),
            ('Mouse inalámbrico Logitech', 'Mouse ergonómico con sensor óptico', 15, 29.99, 'Accesorios'),
            ('Silla de oficina ergonómica', 'Silla con respaldo ajustable y soporte lumbar', 20, 299.99, 'Oficina'),
            ('Sofá de 3 plazas', 'Sofá moderno con tapizado de tela resistente', 8, 899.99, 'Hogar'),
            ('Pelota de fútbol profesional', 'Pelota oficial FIFA con válvula de aire', 25, 89.99, 'Deportes'),
            ('Camiseta básica algodón', 'Camiseta 100% algodón en varios colores', 50, 24.99, 'Ropa'),
            ('Set de bloques de construcción', '100 piezas de plástico resistente', 30, 45.99, 'Juguetes'),
            ('Libro "El Principito"', 'Edición ilustrada en tapa dura', 40, 19.99, 'Libros'),
            ('Guitarra acústica', 'Guitarra de 6 cuerdas con funda incluida', 12, 199.99, 'Música'),
            ('Set de ollas antiadherentes', '5 piezas con mango ergonómico', 15, 149.99, 'Cocina'),
            ('Maceta de cerámica grande', 'Maceta de 30cm con plato incluido', 35, 34.99, 'Jardín'),
            ('Aceite de motor sintético', 'Aceite 5W-30 para motor de gasolina', 60, 12.99, 'Automotriz'),
            ('Termómetro digital', 'Termómetro de precisión con pantalla LCD', 25, 15.99, 'Salud'),
            ('Set de maquillaje profesional', 'Paleta de sombras y pinceles incluidos', 18, 79.99, 'Belleza'),
            ('Juguete para perro resistente', 'Pelota de goma para perros grandes', 45, 8.99, 'Mascotas')
        ]
        
        # Insertar cada producto
        for producto in productos_ejemplo:
            cursor.execute('''
                INSERT OR IGNORE INTO productos (nombre, descripcion, cantidad, precio, categoria)
                VALUES (?, ?, ?, ?, ?)
            ''', producto)
        
        conn.commit()
        conn.close()

# Inicializar base de datos al arrancar
init_database()

@app.route('/api/health', methods=['GET'])
def health_check():
    """Endpoint de verificación de salud de la API"""
    return jsonify({
        'status': 'healthy',
        'message': 'API de Inventario funcionando correctamente con SQLite',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/products', methods=['GET'])
def get_products():
    """Obtiene todos los productos"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Obtener todos los productos
        cursor.execute('''
            SELECT id, nombre, descripcion, cantidad, precio, categoria
            FROM productos
            ORDER BY nombre
        ''')
        
        products = [dict_from_row(row) for row in cursor.fetchall()]
        conn.close()
        
        return jsonify({
            'success': True,
            'data': products,
            'count': len(products)
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Obtiene un producto específico por ID"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, nombre, descripcion, cantidad, precio, categoria
            FROM productos
            WHERE id = ?
        ''', (product_id,))
        
        product = cursor.fetchone()
        conn.close()
        
        if product:
            return jsonify({
                'success': True,
                'data': dict_from_row(product)
            })
        else:
            return jsonify({
                'success': False,
                'error': 'Producto no encontrado'
            }), 404
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/products', methods=['POST'])
def create_product():
    """Crea un nuevo producto"""
    try:
        data = request.get_json()
        
        # Validar datos requeridos
        required_fields = ['nombre', 'cantidad', 'precio', 'categoria']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'error': f'Campo requerido: {field}'
                }), 400
        
        # Validar tipos de datos
        try:
            cantidad = int(data['cantidad'])
            precio = float(data['precio'])
        except ValueError:
            return jsonify({
                'success': False,
                'error': 'Cantidad y precio deben ser números'
            }), 400
        
        # Validar valores positivos
        if cantidad < 0 or precio < 0:
            return jsonify({
                'success': False,
                'error': 'Cantidad y precio deben ser positivos'
            }), 400
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Insertar nuevo producto
        cursor.execute('''
            INSERT INTO productos (nombre, descripcion, cantidad, precio, categoria)
            VALUES (?, ?, ?, ?, ?)
        ''', (
            data['nombre'],
            data.get('descripcion', ''),
            cantidad,
            precio,
            data['categoria']
        ))
        
        product_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        # Retornar el producto creado
        return jsonify({
            'success': True,
            'message': 'Producto creado exitosamente',
            'data': {
                'id': product_id,
                'nombre': data['nombre'],
                'descripcion': data.get('descripcion', ''),
                'cantidad': cantidad,
                'precio': precio,
                'categoria': data['categoria']
            }
        }), 201
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    """Actualiza un producto existente"""
    try:
        data = request.get_json()
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Verificar que el producto existe
        cursor.execute('SELECT * FROM productos WHERE id = ?', (product_id,))
        if not cursor.fetchone():
            conn.close()
            return jsonify({
                'success': False,
                'error': 'Producto no encontrado'
            }), 404
        
        # Construir query de actualización dinámicamente
        update_fields = []
        update_values = []
        
        if 'nombre' in data:
            update_fields.append('nombre = ?')
            update_values.append(data['nombre'])
        
        if 'descripcion' in data:
            update_fields.append('descripcion = ?')
            update_values.append(data['descripcion'])
        
        if 'cantidad' in data:
            try:
                cantidad = int(data['cantidad'])
                if cantidad < 0:
                    conn.close()
                    return jsonify({
                        'success': False,
                        'error': 'Cantidad debe ser positiva'
                    }), 400
                update_fields.append('cantidad = ?')
                update_values.append(cantidad)
            except ValueError:
                conn.close()
                return jsonify({
                    'success': False,
                    'error': 'Cantidad debe ser un número'
                }), 400
        
        if 'precio' in data:
            try:
                precio = float(data['precio'])
                if precio < 0:
                    conn.close()
                    return jsonify({
                        'success': False,
                        'error': 'Precio debe ser positivo'
                    }), 400
                update_fields.append('precio = ?')
                update_values.append(precio)
            except ValueError:
                conn.close()
                return jsonify({
                    'success': False,
                    'error': 'Precio debe ser un número'
                }), 400
        
        if 'categoria' in data:
            update_fields.append('categoria = ?')
            update_values.append(data['categoria'])
        
        if not update_fields:
            conn.close()
            return jsonify({
                'success': False,
                'error': 'No se proporcionaron campos para actualizar'
            }), 400
        
        # Ejecutar actualización
        update_values.append(product_id)
        query = f'UPDATE productos SET {", ".join(update_fields)} WHERE id = ?'
        cursor.execute(query, update_values)
        
        conn.commit()
        conn.close()
        
        return jsonify({
            'success': True,
            'message': 'Producto actualizado exitosamente'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    """Elimina un producto"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Verificar que el producto existe
        cursor.execute('SELECT * FROM productos WHERE id = ?', (product_id,))
        if not cursor.fetchone():
            conn.close()
            return jsonify({
                'success': False,
                'error': 'Producto no encontrado'
            }), 404
        
        # Eliminar producto
        cursor.execute('DELETE FROM productos WHERE id = ?', (product_id,))
        conn.commit()
        conn.close()
        
        return jsonify({
            'success': True,
            'message': 'Producto eliminado exitosamente'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/products/search', methods=['GET'])
def search_products():
    """Busca productos por diferentes criterios"""
    try:
        query = request.args.get('q', '')
        search_by = request.args.get('by', 'nombre')
        
        if not query:
            return jsonify({
                'success': False,
                'error': 'Término de búsqueda requerido'
            }), 400
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Construir query de búsqueda
        if search_by == 'categoria':
            sql = '''
                SELECT id, nombre, descripcion, cantidad, precio, categoria
                FROM productos
                WHERE categoria LIKE ?
                ORDER BY nombre
            '''
        elif search_by == 'descripcion':
            sql = '''
                SELECT id, nombre, descripcion, cantidad, precio, categoria
                FROM productos
                WHERE descripcion LIKE ?
                ORDER BY nombre
            '''
        else:  # búsqueda por nombre (por defecto)
            sql = '''
                SELECT id, nombre, descripcion, cantidad, precio, categoria
                FROM productos
                WHERE nombre LIKE ?
                ORDER BY nombre
            '''
        
        cursor.execute(sql, (f'%{query}%',))
        products = [dict_from_row(row) for row in cursor.fetchall()]
        conn.close()
        
        return jsonify({
            'success': True,
            'data': products,
            'count': len(products),
            'search_term': query,
            'search_by': search_by
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/products/low-stock', methods=['GET'])
def get_low_stock_products():
    """Obtiene productos con bajo stock"""
    try:
        threshold = request.args.get('threshold', 10, type=int)
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, nombre, descripcion, cantidad, precio, categoria
            FROM productos
            WHERE cantidad < ?
            ORDER BY cantidad ASC
        ''', (threshold,))
        
        products = [dict_from_row(row) for row in cursor.fetchall()]
        conn.close()
        
        return jsonify({
            'success': True,
            'data': products,
            'count': len(products),
            'threshold': threshold
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/statistics', methods=['GET'])
def get_statistics():
    """Obtiene estadísticas del inventario"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Total de productos
        cursor.execute('SELECT COUNT(*) FROM productos')
        total_products = cursor.fetchone()[0]
        
        # Valor total del inventario
        cursor.execute('SELECT SUM(cantidad * precio) FROM productos')
        total_value = cursor.fetchone()[0] or 0
        
        # Productos con bajo stock
        cursor.execute('SELECT COUNT(*) FROM productos WHERE cantidad < 10')
        low_stock_count = cursor.fetchone()[0]
        
        # Categorías
        cursor.execute('SELECT categoria, COUNT(*) FROM productos GROUP BY categoria')
        categories = dict(cursor.fetchall())
        
        conn.close()
        
        return jsonify({
            'success': True,
            'data': {
                'total_products': total_products,
                'total_value': round(total_value, 2),
                'low_stock_count': low_stock_count,
                'low_stock_percentage': round((low_stock_count / total_products * 100), 2) if total_products > 0 else 0,
                'categories': categories
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# Configuración de assets estáticos
@app.route('/assets/<path:filename>')
def serve_asset(filename):
    """Sirve archivos estáticos desde la carpeta assets"""
    try:
        # Ruta desde el directorio backend hacia la carpeta assets
        assets_path = os.path.join(os.path.dirname(__file__), '..', 'assets')
        print(f"🔍 Buscando asset: {filename} en {assets_path}")
        return send_from_directory(assets_path, filename)
    except FileNotFoundError:
        return {'error': 'Asset no encontrado'}, 404

@app.route('/assets/icons/<path:filename>')
def serve_icon(filename):
    """Sirve iconos específicamente"""
    try:
        # Ruta desde el directorio backend hacia la carpeta assets/icons
        icons_path = os.path.join(os.path.dirname(__file__), '..', 'assets', 'icons')
        print(f"🔍 Buscando icono: {filename} en {icons_path}")
        return send_from_directory(icons_path, filename)
    except FileNotFoundError:
        return {'error': 'Icono no encontrado'}, 404

@app.route('/assets/images/<path:filename>')
def serve_image(filename):
    """Sirve imágenes específicamente"""
    try:
        # Ruta desde el directorio backend hacia la carpeta assets/images
        images_path = os.path.join(os.path.dirname(__file__), '..', 'assets', 'images')
        print(f"🔍 Buscando imagen: {filename} en {images_path}")
        return send_from_directory(images_path, filename)
    except FileNotFoundError:
        return {'error': 'Imagen no encontrada'}, 404

if __name__ == '__main__':
    print("🚀 Iniciando API REST del Sistema de Inventario...")
    print(f"📁 Base de datos: {DB_PATH}")
    print("🌐 Servidor ejecutándose en: http://localhost:5001")
    print("📚 Documentación de endpoints:")
    print("   GET  /api/health - Verificar estado de la API")
    print("   GET  /api/products - Obtener todos los productos")
    print("   GET  /api/products/<id> - Obtener producto por ID")
    print("   POST /api/products - Crear nuevo producto")
    print("   PUT  /api/products/<id> - Actualizar producto")
    print("   DELETE /api/products/<id> - Eliminar producto")
    print("   GET  /api/products/search?q=<term>&by=<field> - Buscar productos")
    print("   GET  /api/products/low-stock?threshold=<num> - Productos con bajo stock")
    print("   GET  /api/statistics - Estadísticas del inventario")
    
    app.run(debug=False, host='0.0.0.0', port=5001, use_reloader=False)
