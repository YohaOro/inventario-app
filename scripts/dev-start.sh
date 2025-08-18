#!/bin/bash

# Script optimizado para desarrollo rápido del Sistema de Inventario
echo "🚀 Iniciando Sistema de Inventario en modo DESARROLLO..."
echo ""

# Verificar dependencias
if ! command -v python3 &> /dev/null; then
    echo "❌ Error: python3 no está disponible"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm no está disponible"
    exit 1
fi

# Verificar si nodemon está instalado
if ! npm list -g nodemon &> /dev/null; then
    echo "📦 Instalando nodemon globalmente para hot-reload..."
    npm install -g nodemon
fi

# Verificar si flask está instalado
if ! python3 -c "import flask" &> /dev/null; then
    echo "📦 Instalando dependencias del backend..."
    pip3 install -r requirements.txt
fi

echo "📊 Inicializando base de datos..."
python3 backend/init_db.py

echo ""
echo "🌐 Iniciando Backend con Flask debug (puerto 5001)..."
echo "   Hot-reload activado - los cambios se reflejan automáticamente"
cd backend
export FLASK_APP=api.py
export FLASK_ENV=development
export FLASK_DEBUG=1
python3 -m flask run --host=0.0.0.0 --port=5001 &
BACKEND_PID=$!
cd ..

echo ""
echo "📱 Iniciando Frontend con nodemon (puerto 3000)..."
echo "   Hot-reload activado - los cambios se reflejan automáticamente"
cd frontend
nodemon --watch src --ext js,jsx,ts,tsx,json,css --exec "npm start" &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Sistema iniciado en modo DESARROLLO!"
echo "🌐 Backend: http://localhost:5001 (con hot-reload)"
echo "📱 Frontend: http://localhost:3000 (con hot-reload)"
echo ""
echo "💡 Características del modo desarrollo:"
echo "   - Backend: Flask debug mode activado"
echo "   - Frontend: Nodemon con hot-reload"
echo "   - Cambios en código se reflejan automáticamente"
echo ""
echo "🛑 Para detener ambos servicios:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "🎉 ¡Desarrollo más rápido activado!"
