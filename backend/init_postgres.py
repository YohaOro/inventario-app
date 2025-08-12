#!/usr/bin/env python3
"""
Script para inicializar la base de datos PostgreSQL
"""

import psycopg2
import os
from urllib.parse import urlparse

def init_database():
    """Inicializa la base de datos PostgreSQL"""
    
    # Obtener la URL de la base de datos desde variables de entorno
    DATABASE_URL = os.environ.get('DATABASE_URL')
    
    if not DATABASE_URL:
        print("Error: DATABASE_URL no está configurada")
        return False
    
    try:
        # Parsear la URL de la base de datos
        url = urlparse(DATABASE_URL)
        
        # Conectar a la base de datos
        conn = psycopg2.connect(
            host=url.hostname,
            port=url.port,
            database=url.path[1:],
            user=url.username,
            password=url.password
        )
        
        cursor = conn.cursor()
        
        # Crear tabla de productos
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS productos (
                id SERIAL PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
                descripcion TEXT,
                cantidad INTEGER NOT NULL DEFAULT 0,
                precio DECIMAL(10,2) NOT NULL,
                categoria VARCHAR(100) NOT NULL,
                fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Crear índice para búsquedas
        cursor.execute('''
            CREATE INDEX IF NOT EXISTS idx_productos_nombre 
            ON productos(nombre)
        ''')
        
        cursor.execute('''
            CREATE INDEX IF NOT EXISTS idx_productos_categoria 
            ON productos(categoria)
        ''')
        
        # Insertar algunos productos de ejemplo
        cursor.execute('''
            INSERT INTO productos (nombre, descripcion, cantidad, precio, categoria)
            VALUES 
                ('Laptop HP Pavilion', 'Laptop de 15 pulgadas con procesador Intel i5', 10, 899.99, 'Electrónicos'),
                ('Mesa de Oficina', 'Mesa de escritorio de madera para oficina', 25, 199.99, 'Mobiliario'),
                ('Café Colombiano', 'Café premium de grano colombiano', 50, 15.99, 'Alimentos')
            ON CONFLICT DO NOTHING
        ''')
        
        # Confirmar cambios
        conn.commit()
        
        print("✅ Base de datos PostgreSQL inicializada correctamente")
        print(f"📊 Tabla 'productos' creada")
        print(f"🔍 Índices de búsqueda creados")
        print(f"📦 Productos de ejemplo insertados")
        
        cursor.close()
        conn.close()
        
        return True
        
    except Exception as e:
        print(f"❌ Error al inicializar la base de datos: {e}")
        return False

if __name__ == "__main__":
    init_database()
