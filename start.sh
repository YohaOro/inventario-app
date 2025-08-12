#!/bin/bash

# Script para iniciar el Sistema de Inventario completo
echo "🚀 Iniciando Sistema de Inventario..."
echo ""

# Verificar que Python3 esté disponible
if ! command -v python3 &> /dev/null; then
    echo "❌ Error: python3 no está disponible"
    exit 1
fi

# Verificar que npm esté disponible
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm no está disponible"
    exit 1
fi

echo "📊 Inicializando base de datos..."
cd backend
python3 init_db.py
cd ..

echo ""
echo "🌐 Iniciando Backend (puerto 5001)..."
cd backend
./run_server.sh &
BACKEND_PID=$!
cd ..

echo ""
echo "📱 Iniciando Frontend (puerto 3000)..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Sistema iniciado correctamente!"
echo "🌐 Backend: http://localhost:5001"
echo "📱 Frontend: http://localhost:3000"
echo ""
echo "💡 Para detener ambos servicios:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "🎉 ¡Disfruta de tu aplicación de inventario!"
