#!/bin/bash

# 🚀 Script Principal del Sistema de Inventario
# Autor: Sistema de Inventario
# Uso: ./start.sh [comando]

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

# Función para mostrar ayuda
show_help() {
    echo ""
    echo -e "${BLUE}🚀 Sistema de Gestión de Inventario - Scripts${NC}"
    echo ""
    echo -e "${GREEN}COMANDOS DISPONIBLES:${NC}"
    echo ""
    echo -e "  ${YELLOW}start${NC}     - Inicia toda la aplicación (backend + frontend)"
    echo -e "  ${YELLOW}stop${NC}      - Detiene todos los servicios"
    echo -e "  ${YELLOW}dev${NC}       - Inicio rápido con PM2"
    echo -e "  ${YELLOW}dev:basic${NC} - Desarrollo básico"
    echo -e "  ${YELLOW}watchman${NC}  - Desarrollo con Watchman"
    echo -e "  ${YELLOW}clean${NC}     - Limpieza básica"
    echo -e "  ${YELLOW}clean:all${NC} - Limpieza completa"
    echo -e "  ${YELLOW}help${NC}      - Muestra esta ayuda"
    echo ""
    echo -e "${GREEN}EJEMPLOS:${NC}"
    echo ""
    echo -e "  ${YELLOW}./start.sh start${NC}     # Inicia la aplicación"
    echo -e "  ${YELLOW}./start.sh stop${NC}      # Detiene servicios"
    echo -e "  ${YELLOW}./start.sh dev${NC}       # Modo desarrollo"
    echo ""
    echo -e "${GREEN}NOTA:${NC} También puedes usar los comandos npm:"
    echo -e "  ${YELLOW}npm start${NC}            # Inicia aplicación"
    echo -e "  ${YELLOW}npm run stop${NC}         # Detiene servicios"
    echo ""
}

# Función para ejecutar comando
execute_command() {
    local command=$1
    
    case $command in
        "start")
            print_status "🚀 Iniciando aplicación completa..."
            ./scripts/start-app.sh
            ;;
        "stop")
            print_status "🛑 Deteniendo servicios..."
            ./scripts/stop-app.sh
            ;;
        "dev")
            print_status "⚡ Iniciando modo desarrollo con PM2..."
            ./scripts/quick-start.sh
            ;;
        "dev:basic")
            print_status "🔧 Iniciando desarrollo básico..."
            ./scripts/dev-start.sh
            ;;
        "watchman")
            print_status "👀 Iniciando con Watchman..."
            ./scripts/watchman-start.sh
            ;;
        "clean")
            print_status "🧹 Limpieza básica..."
            ./scripts/clean.sh
            ;;
        "clean:all")
            print_status "🧹 Limpieza completa..."
            ./scripts/clean.sh --all
            ;;
        "help"|"--help"|"-h")
            show_help
            ;;
        "")
            print_error "❌ No se especificó ningún comando"
            echo ""
            show_help
            exit 1
            ;;
        *)
            print_error "❌ Comando desconocido: $command"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# Verificar que estamos en el directorio correcto
if [ ! -f "scripts/start-app.sh" ]; then
    print_error "❌ Este script debe ejecutarse desde la raíz del proyecto"
    exit 1
fi

# Verificar permisos de ejecución
if [ ! -x "scripts/start-app.sh" ]; then
    print_status "🔧 Configurando permisos de ejecución..."
    chmod +x scripts/*.sh
fi

# Ejecutar comando
execute_command "$1"
