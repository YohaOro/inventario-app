#!/usr/bin/env python3
"""
Script para inicializar la base de datos del sistema de inventario
"""

import sqlite3
import os

# Obtener la ruta absoluta a la raíz del proyecto
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DB_PATH = os.path.join(PROJECT_ROOT, 'inventario.db')

def crear_tabla():
    """Crea la tabla productos según los requisitos especificados"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS productos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            descripcion TEXT,
            cantidad INTEGER NOT NULL,
            precio REAL NOT NULL,
            categoria TEXT
        )
    ''')
    
    conn.commit()
    conn.close()
    print("✅ Tabla productos creada correctamente!")

def insertar_datos_ejemplo():
    """Inserta datos de ejemplo en la base de datos"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Datos de ejemplo: mueblería, jardinería, oficina
    productos_ejemplo = [
        # Mueblería
        ("Sofá de 3 plazas", "Sofá moderno y cómodo", 15, 899.99, "Mueblería"),
        ("Mesa de comedor", "Mesa de madera para 6 personas", 8, 450.00, "Mueblería"),
        ("Silla de escritorio", "Silla ergonómica de oficina", 25, 199.99, "Mueblería"),
        ("Cama matrimonial", "Cama de 1.60 x 2.00 metros", 12, 650.00, "Mueblería"),
        ("Estantería", "Estantería de 5 niveles", 20, 180.00, "Mueblería"),
        
        # Jardinería
        ("Maceta grande", "Maceta de cerámica 30cm", 30, 45.99, "Jardinería"),
        ("Tierra abonada", "Saco de tierra 20kg", 50, 25.50, "Jardinería"),
        ("Regadera", "Regadera plástica 2L", 40, 18.99, "Jardinería"),
        ("Pala de jardín", "Pala metálica resistente", 15, 35.00, "Jardinería"),
        ("Semillas de tomate", "Paquete con 100 semillas", 100, 8.99, "Jardinería"),
        
        # Oficina
        ("Laptop HP", "Laptop 15 pulgadas, 8GB RAM", 10, 1299.99, "Oficina"),
        ("Monitor 24\"", "Monitor LED Full HD", 18, 299.99, "Oficina"),
        ("Teclado inalámbrico", "Teclado ergonómico", 35, 89.99, "Oficina"),
        ("Mouse óptico", "Mouse inalámbrico", 45, 29.99, "Oficina"),
        ("Impresora", "Impresora multifunción", 8, 399.99, "Oficina")
    ]
    
    for producto in productos_ejemplo:
        cursor.execute('''
            INSERT INTO productos (nombre, descripcion, cantidad, precio, categoria)
            VALUES (?, ?, ?, ?, ?)
        ''', producto)
    
    conn.commit()
    conn.close()
    print("✅ Datos de ejemplo insertados correctamente!")

def verificar_datos():
    """Verifica que los datos se hayan insertado correctamente"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute('SELECT COUNT(*) FROM productos')
    total = cursor.fetchone()[0]
    
    cursor.execute('SELECT * FROM productos LIMIT 3')
    productos = cursor.fetchall()
    
    conn.close()
    
    print(f"📊 Total de productos en la base de datos: {total}")
    print("📋 Primeros 3 productos:")
    for producto in productos:
        print(f"   - {producto[1]} (${producto[4]}) - Stock: {producto[3]}")

if __name__ == "__main__":
    print("🚀 Inicializando base de datos del Sistema de Inventario...")
    print(f"📁 Ruta de la base de datos: {DB_PATH}")
    
    crear_tabla()
    insertar_datos_ejemplo()
    verificar_datos()
    
    print("\n✅ Base de datos inicializada correctamente!")
    print("🌐 Ahora puedes ejecutar la API con: python3 api.py")
