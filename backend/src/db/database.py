import sqlite3

def crear_tabla():
    """Crea la tabla productos según los requisitos especificados"""
    conn = sqlite3.connect('inventario.db')
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

def insertar_datos_ejemplo():
    """Inserta datos de ejemplo en la base de datos"""
    conn = sqlite3.connect('inventario.db')
    cursor = conn.cursor()
    
    # Datos de ejemplo
    productos_ejemplo = [
        # Mueblería
        ("Silla de comedor", "Silla de madera con respaldo ergonómico", 25, 45000.0, "Mueblería"),
        ("Mesa de comedor", "Mesa rectangular de 6 puestos", 12, 180000.0, "Mueblería"),
        ("Sofá 3 plazas", "Sofá moderno con tapizado de tela", 8, 250000.0, "Mueblería"),
        ("Cama matrimonial", "Cama con cabecera y somier incluido", 15, 320000.0, "Mueblería"),
        ("Escritorio", "Escritorio de madera con cajones", 20, 95000.0, "Mueblería"),
        ("Estantería", "Estantería de 5 niveles", 10, 75000.0, "Mueblería"),
        ("Mesa de centro", "Mesa de centro con cristal", 18, 65000.0, "Mueblería"),
        ("Silla de oficina", "Silla ergonómica con respaldo ajustable", 30, 85000.0, "Mueblería"),
        
        # Jardinería
        ("Maceta grande", "Maceta de cerámica 30cm de diámetro", 50, 15000.0, "Jardinería"),
        ("Tierra abonada", "Saco de tierra abonada 20kg", 100, 8000.0, "Jardinería"),
        ("Pala de jardín", "Pala de acero con mango de madera", 25, 25000.0, "Jardinería"),
        ("Rastrillo", "Rastrillo de 12 dientes", 30, 18000.0, "Jardinería"),
        ("Manguera 20m", "Manguera de riego 20 metros", 40, 35000.0, "Jardinería"),
        ("Regadera", "Regadera plástica 2 litros", 60, 12000.0, "Jardinería"),
        ("Tijera de podar", "Tijera profesional para poda", 15, 45000.0, "Jardinería"),
        ("Fertilizante", "Fertilizante orgánico 1kg", 80, 15000.0, "Jardinería"),
        ("Semillas tomate", "Paquete de semillas de tomate", 200, 5000.0, "Jardinería"),
        ("Maceta pequeña", "Maceta plástica 15cm", 75, 8000.0, "Jardinería"),
        
        # Oficina
        ("Laptop HP", "Laptop HP 15 pulgadas 8GB RAM", 10, 850000.0, "Oficina"),
        ("Monitor 24\"", "Monitor LED 24 pulgadas", 15, 180000.0, "Oficina"),
        ("Teclado inalámbrico", "Teclado inalámbrico ergonómico", 25, 45000.0, "Oficina"),
        ("Mouse óptico", "Mouse inalámbrico con sensor óptico", 30, 25000.0, "Oficina"),
        ("Impresora láser", "Impresora láser monocromática", 8, 320000.0, "Oficina"),
        ("Escáner", "Escáner de documentos A4", 12, 95000.0, "Oficina"),
        ("Papel A4", "Resma de papel A4 500 hojas", 100, 15000.0, "Oficina"),
        ("Cartucho tinta", "Cartucho de tinta negra", 50, 35000.0, "Oficina"),
        ("Cable USB", "Cable USB tipo C 1 metro", 80, 8000.0, "Oficina"),
        ("Organizador escritorio", "Organizador de escritorio plástico", 40, 18000.0, "Oficina"),
        ("Calculadora", "Calculadora científica", 35, 22000.0, "Oficina"),
        ("Lámpara escritorio", "Lámpara LED de escritorio", 20, 55000.0, "Oficina")
    ]
    
    # Insertar productos
    for producto in productos_ejemplo:
        cursor.execute('''
            INSERT INTO productos (nombre, descripcion, cantidad, precio, categoria)
            VALUES (?, ?, ?, ?, ?)
        ''', producto)
    
    conn.commit()
    conn.close()
    print("✅ Datos de ejemplo insertados correctamente")

def agregar_producto(nombre, descripcion, cantidad, precio, categoria):
    """Agrega un nuevo producto a la base de datos"""
    conn = sqlite3.connect('inventario.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO productos (nombre, descripcion, cantidad, precio, categoria)
        VALUES (?, ?, ?, ?, ?)
    ''', (nombre, descripcion, cantidad, precio, categoria))
    
    conn.commit()
    conn.close()

def obtener_productos():
    """Obtiene todos los productos"""
    conn = sqlite3.connect('inventario.db')
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM productos')
    productos = cursor.fetchall()
    
    conn.close()
    return productos

def actualizar_producto(id, nombre, descripcion, cantidad, precio, categoria):
    """Actualiza un producto existente"""
    conn = sqlite3.connect('inventario.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        UPDATE productos
        SET nombre = ?, descripcion = ?, cantidad = ?, precio = ?, categoria = ?
        WHERE id = ?
    ''', (nombre, descripcion, cantidad, precio, categoria, id))
    
    conn.commit()
    conn.close()

def eliminar_producto(id):
    """Elimina un producto por ID"""
    conn = sqlite3.connect('inventario.db')
    cursor = conn.cursor()
    
    cursor.execute('DELETE FROM productos WHERE id = ?', (id,))
    
    conn.commit()
    conn.close()

def buscar_producto_por_id(id):
    """Busca un producto por ID"""
    conn = sqlite3.connect('inventario.db')
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM productos WHERE id = ?', (id,))
    producto = cursor.fetchone()
    
    conn.close()
    return producto

def buscar_producto_por_nombre(nombre):
    """Busca productos por nombre (búsqueda parcial)"""
    conn = sqlite3.connect('inventario.db')
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM productos WHERE nombre LIKE ?', ('%' + nombre + '%',))
    productos = cursor.fetchall()
    
    conn.close()
    return productos

def buscar_producto_por_categoria(categoria):
    """Busca productos por categoría"""
    conn = sqlite3.connect('inventario.db')
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM productos WHERE categoria LIKE ?', ('%' + categoria + '%',))
    productos = cursor.fetchall()
    
    conn.close()
    return productos

def reporte_productos_bajo_stock(limite):
    """Genera reporte de productos con stock bajo"""
    conn = sqlite3.connect('inventario.db')
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM productos WHERE cantidad <= ?', (limite,))
    productos = cursor.fetchall()
    
    conn.close()
    return productos