#!/bin/bash

# 🛑 Script para detener la aplicación completa de inventario
# Autor: Sistema de Inventario
# Uso: ./stop-app.sh

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir con colores
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_status "🛑 Deteniendo Sistema de Inventario..."

# Detener procesos en puerto 5001 (Backend)
if lsof -i :5001 >/dev/null 2>&1; then
    print_status "Deteniendo backend en puerto 5001..."
    lsof -ti :5001 | xargs kill -9 2>/dev/null || true
    print_success "Backend detenido"
else
    print_status "Backend no estaba ejecutándose"
fi

# Detener procesos en puerto 3000 (Frontend)
if lsof -i :3000 >/dev/null 2>&1; then
    print_status "Deteniendo frontend en puerto 3000..."
    lsof -ti :3000 | xargs kill -9 2>/dev/null || true
    print_success "Frontend detenido"
else
    print_status "Frontend no estaba ejecutándose"
fi

# Detener procesos de Node.js relacionados con el proyecto
print_status "Deteniendo procesos de Node.js..."
pkill -f "react-scripts start" 2>/dev/null || true
pkill -f "npm start" 2>/dev/null || true

# Detener procesos de Python relacionados con el proyecto
print_status "Deteniendo procesos de Python..."
pkill -f "python3 api.py" 2>/dev/null || true

# Verificar que los puertos estén libres
sleep 2

if ! lsof -i :5001 >/dev/null 2>&1 && ! lsof -i :3000 >/dev/null 2>&1; then
    print_success "🎉 Todos los servicios han sido detenidos"
    print_status "Puertos 5001 y 3000 están libres"
else
    print_warning "Algunos servicios pueden seguir ejecutándose"
fi

echo ""
print_status "📋 Estado de puertos:"
echo -e "Puerto 5001 (Backend): ${GREEN}Libre${NC}"
echo -e "Puerto 3000 (Frontend): ${GREEN}Libre${NC}"
echo ""
print_success "¡Hasta luego! 👋"
