#!/bin/bash

echo "🧹 Limpiando Sistema de Inventario..."
echo ""

# Detener servicios si están ejecutándose
if command -v pm2 &> /dev/null; then
    echo "🛑 Deteniendo servicios PM2..."
    npx pm2 stop all 2>/dev/null || true
    npx pm2 delete all 2>/dev/null || true
fi

# Limpiar dependencias del frontend
echo "📦 Limpiando node_modules del frontend..."
cd frontend
rm -rf node_modules package-lock.json
echo "✅ Frontend limpiado"

# Limpiar cache de Python
echo "🐍 Limpiando cache de Python..."
cd ../backend
find . -type f -name "*.pyc" -delete
find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
echo "✅ Backend limpiado"

# Volver al directorio raíz
cd ..

# Limpiar archivos temporales
echo "🗑️ Limpiando archivos temporales..."
rm -f *.pyc
rm -f .DS_Store
rm -f Thumbs.db

# Limpiar base de datos (opcional)
if [ "$1" == "--all" ]; then
    echo "🗄️ Eliminando base de datos..."
    rm -f inventario.db
    echo "✅ Base de datos eliminada"
fi

echo ""
echo "🎉 ¡Limpieza completada!"
echo ""
echo "💡 Para reinstalar dependencias:"
echo "   cd frontend && npm install"
echo ""
echo "💡 Para iniciar de nuevo:"
echo "   ./quick-start.sh"
