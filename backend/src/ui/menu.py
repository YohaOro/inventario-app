import sqlite3
from db.database import (
    crear_tabla, agregar_producto, obtener_productos, actualizar_producto,
    eliminar_producto, buscar_producto_por_id, buscar_producto_por_nombre,
    buscar_producto_por_categoria, reporte_productos_bajo_stock
)
from colorama import init, Fore, Style

init(autoreset=True)

def mostrar_menu():
    """Muestra el menú principal de la aplicación"""
    print(Fore.CYAN + "=== SISTEMA DE GESTIÓN DE INVENTARIO ===")
    print(Fore.YELLOW + "1. 📦 Registrar nuevo producto")
    print("2. 👁️  Visualizar productos")
    print("3. ✏️  Actualizar producto")
    print("4. 🗑️  Eliminar producto")
    print("5. 🔍 Buscar producto")
    print("6. 📊 Reporte de productos con bajo stock")
    print(Fore.RED + "7. 🚪 Salir")
    print(Fore.CYAN + "========================================")

def registrar_producto():
    """Registra un nuevo producto"""
    print(Fore.GREEN + "\n=== REGISTRAR NUEVO PRODUCTO ===")
    
    nombre = input("Nombre del producto: ")
    descripcion = input("Descripción: ")
    
    while True:
        try:
            cantidad = int(input("Cantidad: "))
            break
        except ValueError:
            print(Fore.RED + "❌ Error: La cantidad debe ser un número entero")
    
    while True:
        try:
            precio = float(input("Precio: "))
            break
        except ValueError:
            print(Fore.RED + "❌ Error: El precio debe ser un número")
    
    categoria = input("Categoría: ")
    
    try:
        agregar_producto(nombre, descripcion, cantidad, precio, categoria)
        print(Fore.GREEN + "✅ Producto registrado exitosamente!")
    except Exception as e:
        print(Fore.RED + f"Error al registrar producto: {e}")

def visualizar_productos():
    """Visualiza todos los productos"""
    print(Fore.GREEN + "\n=== PRODUCTOS REGISTRADOS ===")
    
    try:
        productos = obtener_productos()
        if not productos:
            print(Fore.YELLOW + "No hay productos registrados")
            return
        
        for producto in productos:
            print(Fore.CYAN + f"ID: {producto[0]}")
            print(f"Nombre: {producto[1]}")
            print(f"Descripción: {producto[2]}")
            print(f"Cantidad: {producto[3]}")
            print(f"Precio: ${producto[4]:.2f}")
            print(f"Categoría: {producto[5]}")
            print(Fore.CYAN + "-" * 40)
            
    except Exception as e:
        print(Fore.RED + f"❌ Error al obtener productos: {e}")

def actualizar_producto_menu():
    """Actualiza un producto existente"""
    print(Fore.GREEN + "\n=== ACTUALIZAR PRODUCTO ===")
    
    try:
        id_producto = int(input("Ingrese el ID del producto a actualizar: "))
        
        # Verificar que el producto existe
        producto = buscar_producto_por_id(id_producto)
        if not producto:
            print(Fore.RED + "❌ Producto no encontrado")
            return
        
        print(Fore.YELLOW + f"Producto actual: {producto}")
        
        nombre = input("Nuevo nombre (deje vacío para mantener): ")
        if not nombre:
            nombre = producto[1]
        
        descripcion = input("Nueva descripción (deje vacío para mantener): ")
        if not descripcion:
            descripcion = producto[2]
        
        cantidad_str = input("Nueva cantidad (deje vacío para mantener): ")
        if cantidad_str:
            cantidad = int(cantidad_str)
        else:
            cantidad = producto[3]
        
        precio_str = input("Nuevo precio (deje vacío para mantener): ")
        if precio_str:
            precio = float(precio_str)
        else:
            precio = producto[4]
        
        categoria = input("Nueva categoría (deje vacío para mantener): ")
        if not categoria:
            categoria = producto[5]
        
        actualizar_producto(id_producto, nombre, descripcion, cantidad, precio, categoria)
        print(Fore.GREEN + "✅ Producto actualizado exitosamente!")
        
    except ValueError:
        print(Fore.RED + "❌ Error: ID debe ser un número entero")
    except Exception as e:
        print(Fore.RED + f"❌ Error al actualizar producto: {e}")

def eliminar_producto_menu():
    """Elimina un producto"""
    print(Fore.RED + "\n=== ELIMINAR PRODUCTO ===")
    
    try:
        id_producto = int(input("Ingrese el ID del producto a eliminar: "))
        
        # Verificar que el producto existe
        producto = buscar_producto_por_id(id_producto)
        if not producto:
            print(Fore.RED + "❌ Producto no encontrado")
            return
        
        confirmacion = input(f"¿Está seguro de eliminar el producto '{producto[1]}'? (s/N): ")
        if confirmacion.lower() in ['s', 'si', 'sí', 'y', 'yes']:
            eliminar_producto(id_producto)
            print(Fore.GREEN + "✅ Producto eliminado exitosamente!")
        else:
            print(Fore.YELLOW + "Operación cancelada")
            
    except ValueError:
        print(Fore.RED + "❌ Error: ID debe ser un número entero")
    except Exception as e:
        print(Fore.RED + f"❌ Error al eliminar producto: {e}")

def buscar_producto_menu():
    """Busca productos"""
    print(Fore.GREEN + "\n=== BUSCAR PRODUCTO ===")
    print("1. Buscar por ID")
    print("2. Buscar por nombre")
    print("3. Buscar por categoría")
    
    opcion = input("Seleccione una opción: ")
    
    try:
        if opcion == "1":
            id_producto = int(input("Ingrese el ID del producto: "))
            producto = buscar_producto_por_id(id_producto)
            if producto:
                print(Fore.CYAN + f"ID: {producto[0]}")
                print(f"Nombre: {producto[1]}")
                print(f"Descripción: {producto[2]}")
                print(f"Cantidad: {producto[3]}")
                print(f"Precio: ${producto[4]:.2f}")
                print(f"Categoría: {producto[5]}")
            else:
                print(Fore.RED + "Producto no encontrado")
                
        elif opcion == "2":
            nombre = input("Ingrese el nombre a buscar: ")
            productos = buscar_producto_por_nombre(nombre)
            if productos:
                print(Fore.GREEN + f"Productos encontrados: {len(productos)}")
                for producto in productos:
                    print(Fore.CYAN + f"ID: {producto[0]} - {producto[1]} - Cantidad: {producto[3]}")
            else:
                print(Fore.YELLOW + "No se encontraron productos")
                
        elif opcion == "3":
            categoria = input("Ingrese la categoría a buscar: ")
            productos = buscar_producto_por_categoria(categoria)
            if productos:
                print(Fore.GREEN + f"Productos encontrados: {len(productos)}")
                for producto in productos:
                    print(Fore.CYAN + f"ID: {producto[0]} - {producto[1]} - Categoría: {producto[5]}")
            else:
                print(Fore.YELLOW + "No se encontraron productos")
        else:
            print(Fore.RED + "❌ Opción no válida")
            
    except ValueError:
        print(Fore.RED + "❌ Error: ID debe ser un número entero")
    except Exception as e:
        print(Fore.RED + f"❌ Error al buscar producto: {e}")

def reporte_bajo_stock():
    """Genera reporte de productos con bajo stock"""
    print(Fore.GREEN + "\n=== REPORTE DE PRODUCTOS CON BAJO STOCK ===")
    
    try:
        limite = int(input("Ingrese el límite de cantidad: "))
        productos = reporte_productos_bajo_stock(limite)
        
        if productos:
            print(Fore.YELLOW + f"Productos con cantidad <= {limite}:")
            for producto in productos:
                print(Fore.CYAN + f"ID: {producto[0]} - {producto[1]} - Cantidad: {producto[3]}")
        else:
            print(Fore.YELLOW + f"No hay productos con cantidad <= {limite}")
            
    except ValueError:
        print(Fore.RED + "❌ Error: El límite debe ser un número entero")
    except Exception as e:
        print(Fore.RED + f"❌ Error al generar reporte: {e}")

def main():
    """Función principal de la aplicación"""
    print(Fore.MAGENTA + "SISTEMA DE GESTIÓN DE INVENTARIO")
    print(Fore.CYAN + "Inicializando base de datos...")
    
    # Crear tabla al iniciar
    crear_tabla()
    print(Fore.GREEN + "✅ Base de datos inicializada")
    
    while True:
        try:
            mostrar_menu()
            opcion = input(Fore.YELLOW + "Seleccione una opción (1-7): ")
            
            if opcion == "1":
                registrar_producto()
            elif opcion == "2":
                visualizar_productos()
            elif opcion == "3":
                actualizar_producto_menu()
            elif opcion == "4":
                eliminar_producto_menu()
            elif opcion == "5":
                buscar_producto_menu()
            elif opcion == "6":
                reporte_bajo_stock()
            elif opcion == "7":
                print(Fore.GREEN + "¡Gracias por usar el sistema!")
                break
            else:
                print(Fore.RED + "❌ Opción no válida")
            
            input(Fore.CYAN + "\nPresione Enter para continuar...")
            
        except KeyboardInterrupt:
            print(Fore.RED + "\n\n🛑 Programa terminado por el usuario")
            break
        except Exception as e:
            print(Fore.RED + f"Error inesperado: {e}")

if __name__ == "__main__":
    main()