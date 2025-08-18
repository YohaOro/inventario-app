#!/bin/bash

# 🚀 Script para iniciar la aplicación completa de inventario
# Autor: Sistema de Inventario
# Uso: ./start-app.sh

set -e  # Salir si hay algún error

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

# Función para limpiar procesos al salir
cleanup() {
    print_warning "Deteniendo servicios..."
    
    # Detener backend
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null || true
        print_status "Backend detenido"
    fi
    
    # Detener frontend
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null || true
        print_status "Frontend detenido"
    fi
    
    print_success "Limpieza completada"
    exit 0
}

# Capturar señal de interrupción (Ctrl+C)
trap cleanup SIGINT SIGTERM

# Verificar que estamos en el directorio correcto
if [ ! -f "backend/api.py" ] || [ ! -f "frontend/package.json" ]; then
    print_error "Este script debe ejecutarse desde la raíz del proyecto"
    exit 1
fi

print_status "🚀 Iniciando Sistema de Inventario..."

# Verificar si Python está instalado
if ! command -v python3 &> /dev/null; then
    print_error "Python3 no está instalado"
    exit 1
fi

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    print_error "Node.js no está instalado"
    exit 1
fi

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    print_error "npm no está instalado"
    exit 1
fi

print_success "Dependencias verificadas"

# Verificar si el puerto 5001 está libre
if lsof -i :5001 >/dev/null 2>&1; then
    print_warning "Puerto 5001 ya está en uso. Deteniendo proceso anterior..."
    lsof -ti :5001 | xargs kill -9 2>/dev/null || true
    sleep 2
fi

# Verificar si el puerto 3000 está libre
if lsof -i :3000 >/dev/null 2>&1; then
    print_warning "Puerto 3000 ya está en uso. Deteniendo proceso anterior..."
    lsof -ti :3000 | xargs kill -9 2>/dev/null || true
    sleep 2
fi

# Iniciar backend
print_status "🌐 Iniciando backend en puerto 5001..."
cd backend
python3 api.py > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Esperar a que el backend esté listo
print_status "⏳ Esperando a que el backend esté listo..."
for i in {1..30}; do
    if curl -s "http://localhost:5001/api/health" >/dev/null 2>&1; then
        print_success "Backend iniciado correctamente en puerto 5001"
        break
    fi
    
    if [ $i -eq 30 ]; then
        print_error "Backend no respondió después de 30 segundos"
        cleanup
        exit 1
    fi
    
    sleep 1
done

# Iniciar frontend
print_status "⚛️  Iniciando frontend en puerto 3000..."
cd frontend
npm start > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Esperar a que el frontend esté listo
print_status "⏳ Esperando a que el frontend esté listo..."
for i in {1..60}; do
    if curl -s "http://localhost:3000" >/dev/null 2>&1; then
        print_success "Frontend iniciado correctamente en puerto 3000"
        break
    fi
    
    if [ $i -eq 60 ]; then
        print_warning "Frontend puede tardar más en iniciar..."
        break
    fi
    
    sleep 1
done

# Mostrar información final
echo ""
print_success "🎉 ¡Aplicación iniciada exitosamente!"
echo ""
echo -e "${GREEN}📱 Frontend:${NC} http://localhost:3000"
echo -e "${GREEN}🌐 Backend:${NC} http://localhost:5001"
echo -e "${GREEN}📊 Health Check:${NC} http://localhost:5001/api/health"
echo ""
echo -e "${YELLOW}💡 Para detener la aplicación:${NC} Presiona Ctrl+C"
echo -e "${YELLOW}📝 Logs del backend:${NC} backend.log"
echo -e "${YELLOW}📝 Logs del frontend:${NC} frontend.log"
echo ""

# Mantener el script ejecutándose
print_status "Manteniendo servicios activos... (Ctrl+C para detener)"
wait
