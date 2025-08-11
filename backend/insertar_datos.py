#!/usr/bin/env python3
"""
Script para insertar datos de ejemplo en la base de datos de inventario
"""

from src.db.database import crear_tabla, insertar_datos_ejemplo

def main():
    print("🏪 SISTEMA DE GESTIÓN DE INVENTARIO")
    print("📦 Insertando datos de ejemplo...")
    
    # Crear tabla si no existe
    crear_tabla()
    
    # Insertar datos de ejemplo
    insertar_datos_ejemplo()
    
    print("✅ Proceso completado exitosamente")
    print("\n📊 Resumen de datos insertados:")
    print("   • Mueblería: 8 productos")
    print("   • Jardinería: 9 productos") 
    print("   • Oficina: 12 productos")
    print("   • Total: 29 productos")

if __name__ == "__main__":
    main() 