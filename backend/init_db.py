#!/usr/bin/env python3
"""
Script para inicializar la base de datos del sistema de inventario
"""

import sqlite3
import os

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
    
    cursor.execute('SELECT COUNT(*) FROM productos')
    if cursor.fetchone()[0] > 0:
        print("ℹ️  La base de datos ya contiene productos. No se insertarán datos duplicados.")
        conn.close()
        return
    
    productos_ejemplo = [
        ("Sofá de 3 plazas", "Sofá moderno y cómodo con tela resistente", 15, 899.99, "Hogar"),
        ("Mesa de comedor", "Mesa de madera maciza para 6 personas", 8, 450.00, "Hogar"),
        ("Silla de escritorio", "Silla ergonómica de oficina con respaldo ajustable", 25, 199.99, "Oficina"),
        ("Cama matrimonial", "Cama de 1.60 x 2.00 metros con cabecero", 12, 650.00, "Hogar"),
        ("Estantería", "Estantería de 5 niveles en madera natural", 20, 180.00, "Hogar"),
        
        ("Maceta grande", "Maceta de cerámica 30cm con drenaje", 30, 45.99, "Jardín"),
        ("Tierra abonada", "Saco de tierra 20kg con nutrientes", 50, 25.50, "Jardín"),
        ("Regadera", "Regadera plástica 2L con boquilla ajustable", 40, 18.99, "Jardín"),
        ("Pala de jardín", "Pala metálica resistente con mango ergonómico", 15, 35.00, "Jardín"),
        ("Semillas de tomate", "Paquete con 100 semillas orgánicas", 100, 8.99, "Jardín"),
        
        ("Laptop HP", "Laptop 15 pulgadas, 8GB RAM, SSD 256GB", 10, 1299.99, "Tecnología"),
        ("Monitor 24\"", "Monitor LED Full HD con panel IPS", 18, 299.99, "Tecnología"),
        ("Teclado inalámbrico", "Teclado ergonómico con teclas mecánicas", 35, 89.99, "Tecnología"),
        ("Mouse óptico", "Mouse inalámbrico con sensor de alta precisión", 45, 29.99, "Tecnología"),
        ("Impresora", "Impresora multifunción WiFi con escáner", 8, 399.99, "Tecnología"),
        
        ("Pelota de fútbol", "Pelota oficial tamaño 5 con válvula de calidad", 22, 75.50, "Deportes"),
        ("Raqueta de tenis", "Raqueta profesional con encordado premium", 14, 185.00, "Deportes"),
        ("Botella deportiva", "Botella de acero inoxidable 750ml", 60, 32.99, "Deportes"),
        ("Cinta de correr", "Cinta plegable con motor de 2.5HP", 3, 899.99, "Deportes"),
        ("Pesas ajustables", "Set de pesas de 2.5kg a 25kg", 8, 450.00, "Deportes"),
        
        ("Sartén antiadherente", "Sartén de 28cm con revestimiento cerámico", 18, 65.99, "Cocina"),
        ("Batidora eléctrica", "Batidora de mano con 5 velocidades", 12, 89.99, "Cocina"),
        ("Juego de cuchillos", "Set de 6 cuchillos profesionales", 25, 120.00, "Cocina"),
        ("Olla a presión", "Olla de 6L con válvula de seguridad", 9, 145.50, "Cocina"),
        ("Cafetera automática", "Cafetera programable con molinillo", 6, 299.99, "Cocina"),
        
        ("Camiseta básica", "Camiseta 100% algodón en varios colores", 80, 24.99, "Ropa"),
        ("Jeans clásicos", "Jeans de mezclilla con 5 bolsillos", 45, 89.99, "Ropa"),
        ("Zapatillas deportivas", "Zapatillas con suela de goma y plantilla", 30, 125.00, "Ropa")
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
