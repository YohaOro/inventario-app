#!/bin/bash

# Script SÚPER RÁPIDO para desarrollo
echo "⚡ Inicio SÚPER RÁPIDO del Sistema de Inventario..."
echo ""

# Verificar si PM2 está instalado
if ! command -v pm2 &> /dev/null; then
    echo "📦 Instalando PM2 localmente para gestión rápida de procesos..."
    npm install pm2 --save-dev
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
echo "🚀 Iniciando servicios con PM2 (más rápido)..."
echo "   Hot-reload automático y gestión de procesos optimizada"

# Crear archivo de configuración PM2
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'inventario-backend',
      script: 'python3',
      args: 'api.py',
      cwd: './backend',
      env: {
        FLASK_APP: 'api.py',
        FLASK_ENV: 'development',
        FLASK_DEBUG: '1',
        PORT: 5001
      },
      watch: ['./backend'],
      ignore_watch: ['__pycache__', '*.pyc'],
      autorestart: true
    },
    {
      name: 'inventario-frontend',
      script: 'npm',
      args: 'start',
      cwd: './frontend',
      env: {
        PORT: 3000,
        CHOKIDAR_USEPOLLING: 'true'
      },
      watch: ['./frontend/src'],
      ignore_watch: ['node_modules', 'build'],
      autorestart: true
    }
  ]
};
EOF

# Iniciar con PM2
npx pm2 start ecosystem.config.js

echo ""
echo "✅ Servicios iniciados con PM2!"
echo "🌐 Backend: http://localhost:5001"
echo "📱 Frontend: http://localhost:3000"
echo ""
echo "💡 Comandos útiles de PM2:"
echo "   npx pm2 status      - Ver estado de servicios"
echo "   npx pm2 logs        - Ver logs en tiempo real"
echo "   npx pm2 restart all - Reiniciar todos los servicios"
echo "   npx pm2 stop all    - Detener todos los servicios"
echo "   npx pm2 delete all  - Eliminar todos los servicios"
echo ""
echo "🎉 ¡Desarrollo súper rápido activado!"
