#!/bin/bash

# Script para ejecutar el servidor Flask del Sistema de Inventario
echo "🚀 Iniciando API REST del Sistema de Inventario..."

# Verificar que Python3 esté disponible
if ! command -v python3 &> /dev/null; then
    echo "❌ Error: python3 no está disponible"
    exit 1
fi

# Verificar que la base de datos existe
if [ ! -f "../inventario.db" ]; then
    echo "📊 Inicializando base de datos..."
    python3 init_db.py
fi

# Detener cualquier proceso existente en el puerto 5001
echo "🛑 Deteniendo procesos existentes en el puerto 5001..."
lsof -ti:5001 | xargs kill -9 2>/dev/null || true

# Iniciar el servidor
echo "🌐 Iniciando servidor en http://localhost:5001..."
echo "💡 Para detener el servidor, presiona Ctrl+C"
echo ""

# Ejecutar el servidor
python3 api.py
