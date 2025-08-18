# 🚀 Scripts del Sistema de Inventario

Esta carpeta contiene todos los scripts de automatización para el Sistema de Gestión de Inventario.

## 📁 Estructura de Scripts

### **🚀 Scripts Principales**
- **`start-app.sh`** - Inicia toda la aplicación (backend + frontend)
- **`stop-app.sh`** - Detiene todos los servicios limpiamente

### **🔧 Scripts de Desarrollo**
- **`quick-start.sh`** - Inicio rápido con PM2 para desarrollo avanzado
- **`dev-start.sh`** - Desarrollo básico sin PM2
- **`watchman-start.sh`** - Desarrollo con Watchman para hot-reload

### **🧹 Scripts de Mantenimiento**
- **`clean.sh`** - Limpieza de archivos temporales y caché

## 🎯 Uso de Scripts

### **Desde la Raíz del Proyecto:**
```bash
# Script principal (recomendado)
./start.sh start      # Inicia aplicación
./start.sh stop       # Detiene servicios
./start.sh dev        # Modo desarrollo
./start.sh help       # Muestra ayuda

# Comandos npm (alternativa)
npm start             # Inicia aplicación
npm run stop          # Detiene servicios
npm run dev           # Modo desarrollo
```

### **Directamente desde scripts/:**
```bash
cd scripts
./start-app.sh        # Inicia aplicación
./stop-app.sh         # Detiene servicios
./quick-start.sh      # Desarrollo con PM2
```

## 🔧 Configuración

### **Permisos de Ejecución:**
```bash
# Hacer todos los scripts ejecutables
chmod +x scripts/*.sh

# O usar el script principal
./start.sh help
```

### **Dependencias Requeridas:**
- **Python 3.8+** - Para el backend
- **Node.js 16+** - Para el frontend
- **npm 8+** - Para gestión de paquetes
- **lsof** - Para verificación de puertos (macOS/Linux)

## 📊 Puertos Utilizados

- **Backend**: 5001 (Flask API)
- **Frontend**: 3000 (React App)

## 🚨 Solución de Problemas

### **Puerto Ocupado:**
```bash
# Verificar qué usa el puerto
lsof -i :5001
lsof -i :3000

# Detener manualmente
./start.sh stop
```

### **Scripts No Ejecutables:**
```bash
# Configurar permisos
chmod +x scripts/*.sh
```

### **Dependencias Faltantes:**
```bash
# Verificar Python
python3 --version

# Verificar Node.js
node --version

# Verificar npm
npm --version
```

## 📝 Logs

Los scripts generan logs para debugging:
- **`backend.log`** - Logs del backend Flask
- **`frontend.log`** - Logs del frontend React

## 🔄 Flujo de Trabajo Recomendado

### **Desarrollo Diario:**
```bash
# 1. Iniciar aplicación
./start.sh start

# 2. Desarrollar...

# 3. Detener servicios
./start.sh stop
```

### **Desarrollo Avanzado:**
```bash
# 1. Iniciar con PM2
./start.sh dev

# 2. Desarrollar con hot-reload...

# 3. Detener PM2
npm run stop:pm2
```

### **Limpieza:**
```bash
# Limpieza básica
./start.sh clean

# Limpieza completa (¡cuidado!)
./start.sh clean:all
```

## 📞 Soporte

Si tienes problemas con los scripts:
1. **Verificar permisos**: `chmod +x scripts/*.sh`
2. **Verificar dependencias**: Python3, Node.js, npm
3. **Revisar logs**: `backend.log` y `frontend.log`
4. **Usar script principal**: `./start.sh help`

---

**¡Los scripts están diseñados para hacer tu desarrollo más eficiente! 🚀**
