#!/bin/bash

# Script con Watchman para desarrollo ULTRA RÁPIDO
echo "⚡ Inicio ULTRA RÁPIDO con Watchman..."
echo ""

# Verificar si Watchman está instalado
if ! command -v watchman &> /dev/null; then
    echo "📦 Instalando Watchman (más rápido que nodemon)..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install watchman
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        sudo apt-get update && sudo apt-get install -y watchman
    else
        echo "❌ Sistema operativo no soportado para Watchman"
        exit 1
    fi
fi

# Verificar dependencias
if ! python3 -c "import flask" &> /dev/null; then
    echo "📦 Instalando dependencias del backend..."
    pip3 install -r requirements.txt
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Instalando dependencias del frontend..."
    cd frontend && npm install && cd ..
fi

echo "📊 Inicializando base de datos..."
python3 backend/init_db.py

echo ""
echo "🚀 Iniciando servicios con Watchman..."
echo "   Monitoreo de archivos ultra rápido y eficiente"

# Iniciar backend con Flask debug
cd backend
export FLASK_APP=api.py
export FLASK_ENV=development
export FLASK_DEBUG=1
python3 -m flask run --host=0.0.0.0 --port=5001 &
BACKEND_PID=$!
cd ..

# Iniciar frontend con watchman
cd frontend
# Configurar watchman para el frontend
watchman watch src
watchman -- trigger src frontend-trigger '*.js' '*.jsx' '*.ts' '*.tsx' '*.css' '*.json' -- npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Servicios iniciados con Watchman!"
echo "🌐 Backend: http://localhost:5001 (Flask debug activado)"
echo "📱 Frontend: http://localhost:3000 (Watchman monitoreando)"
echo ""
echo "💡 Características del modo ultra rápido:"
echo "   - Backend: Flask debug mode con auto-reload"
echo "   - Frontend: Watchman con monitoreo eficiente"
echo "   - Cambios se reflejan en milisegundos"
echo ""
echo "🛑 Para detener:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo "   watchman shutdown-server"
echo ""
echo "🎉 ¡Desarrollo ultra rápido activado!"
