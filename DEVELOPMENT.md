# 🚀 Guía de Desarrollo Rápido

## ⚡ **Opciones para desarrollo más rápido:**

### 1. **Script Básico Optimizado** (Recomendado para empezar)
```bash
./dev-start.sh
```
**Características:**
- Flask debug mode activado
- Nodemon para frontend
- Hot-reload automático
- Tiempo de inicio: ~10-15 segundos

### 2. **Script Súper Rápido con PM2** (Más eficiente)
```bash
./quick-start.sh
```
**Características:**
- PM2 para gestión de procesos
- Monitoreo automático
- Restart automático en fallos
- Tiempo de inicio: ~5-8 segundos

### 3. **Script Ultra Rápido con Watchman** (Más rápido)
```bash
./watchman-start.sh
```
**Características:**
- Watchman para monitoreo de archivos
- Flask debug mode
- Cambios en milisegundos
- Tiempo de inicio: ~3-5 segundos

### 4. **Docker Compose** (Para entornos aislados)
```bash
docker-compose -f docker-compose.dev.yml up
```
**Características:**
- Entorno completamente aislado
- Volúmenes montados para hot-reload
- Configuración reproducible
- Tiempo de inicio: ~15-20 segundos

## 🎯 **Comparación de Velocidades:**

| Método | Tiempo de Inicio | Hot-reload | Facilidad |
|--------|------------------|------------|-----------|
| Script Original | ~20-30s | ❌ | ⭐⭐⭐ |
| Script Optimizado | ~10-15s | ✅ | ⭐⭐⭐⭐ |
| PM2 | ~5-8s | ✅ | ⭐⭐⭐⭐⭐ |
| Watchman | ~3-5s | ✅ | ⭐⭐⭐⭐ |
| Docker | ~15-20s | ✅ | ⭐⭐⭐ |

## 🛠️ **Instalación de Herramientas:**

### **Nodemon (para hot-reload básico):**
```bash
npm install -g nodemon
```

### **PM2 (para gestión de procesos):**
```bash
npm install -g pm2
```

### **Watchman (para monitoreo ultra rápido):**
```bash
# macOS
brew install watchman

# Linux
sudo apt-get update && sudo apt-get install -y watchman
```

## 🔧 **Configuraciones de Desarrollo:**

### **Backend (Flask):**
- Debug mode activado
- Auto-reload en cambios
- Logs detallados
- CORS habilitado

### **Frontend (React):**
- Fast refresh activado
- Hot module replacement
- Source maps para debugging
- Proxy al backend

## 📱 **Acceso a la Aplicación:**

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5001
- **Health Check:** http://localhost:5001/api/health

## 🚨 **Solución de Problemas:**

### **Puerto 5001 ocupado:**
```bash
# Ver qué está usando el puerto
lsof -i :5001

# Matar el proceso
kill -9 <PID>
```

### **Puerto 3000 ocupado:**
```bash
# Ver qué está usando el puerto
lsof -i :3000

# Matar el proceso
kill -9 <PID>
```

### **Reiniciar todos los servicios:**
```bash
# Si usas PM2
pm2 restart all

# Si usas scripts
./quick-start.sh
```

## 💡 **Tips para Desarrollo Más Rápido:**

1. **Usa PM2** para gestión de procesos
2. **Mantén la base de datos** entre reinicios
3. **Usa variables de entorno** para configuración
4. **Monitorea logs** en tiempo real
5. **Configura aliases** en tu shell

## 🎉 **¡Desarrollo más rápido activado!**

Elige el método que mejor se adapte a tu flujo de trabajo y disfruta de un desarrollo mucho más eficiente.
