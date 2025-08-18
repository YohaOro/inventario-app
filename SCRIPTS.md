# 🚀 Scripts de la Aplicación de Inventario

## 📋 Scripts Principales

### **🚀 Iniciar Aplicación Completa**
```bash
./start-app.sh
# o
npm start
```

**¿Qué hace?**
- ✅ Verifica dependencias (Python3, Node.js, npm)
- ✅ Libera puertos si están ocupados
- ✅ Inicia backend en puerto 5001
- ✅ Inicia frontend en puerto 3000
- ✅ Espera a que ambos servicios estén listos
- ✅ Muestra URLs de acceso
- ✅ Mantiene servicios activos

**Características:**
- 🎨 Output colorido y informativo
- 🛡️ Manejo de errores robusto
- 🧹 Limpieza automática al salir (Ctrl+C)
- 📝 Logs separados para backend y frontend

### **🛑 Detener Aplicación Completa**
```bash
./stop-app.sh
# o
npm run stop
```

**¿Qué hace?**
- ✅ Detiene backend en puerto 5001
- ✅ Detiene frontend en puerto 3000
- ✅ Limpia procesos de Node.js y Python
- ✅ Verifica que puertos estén libres
- ✅ Muestra estado final

## 🔧 Scripts de Desarrollo

### **⚡ Inicio Rápido**
```bash
npm run dev
# Ejecuta: ./quick-start.sh
```

### **🔍 Desarrollo Básico**
```bash
npm run dev:basic
# Ejecuta: ./dev-start.sh
```

### **👀 Desarrollo con Watchman**
```bash
npm run dev:watchman
# Ejecuta: ./watchman-start.sh
```

## 🧹 Scripts de Limpieza

### **🧽 Limpieza Básica**
```bash
npm run clean
# Elimina: node_modules, __pycache__, *.pyc
```

### **🧹 Limpieza Completa**
```bash
npm run clean:all
# Elimina: node_modules, __pycache__, *.pyc, inventario.db
```

## 📊 Scripts de PM2 (Legacy)

### **📈 Estado de PM2**
```bash
npm run status
# Muestra estado de procesos PM2
```

### **📝 Logs de PM2**
```bash
npm run logs
# Muestra logs de procesos PM2
```

### **🔄 Reiniciar PM2**
```bash
npm run restart
# Reinicia todos los procesos PM2
```

### **⏹️ Detener PM2**
```bash
npm run stop:pm2
# Detiene todos los procesos PM2
```

## 🎯 Uso Recomendado

### **🟢 Para Desarrollo Diario:**
```bash
# Iniciar todo
npm start

# En otra terminal, para detener
npm run stop
```

### **🟡 Para Desarrollo Avanzado:**
```bash
# Inicio rápido con PM2
npm run dev

# Desarrollo básico
npm run dev:basic
```

### **🔴 Para Limpieza:**
```bash
# Limpieza básica
npm run clean

# Limpieza completa (¡cuidado!)
npm run clean:all
```

## 🚨 Notas Importantes

### **Puertos Utilizados:**
- **Backend**: 5001
- **Frontend**: 3000

### **Dependencias Requeridas:**
- **Python 3.x**
- **Node.js 16+**
- **npm 8+**

### **Sistema Operativo:**
- **macOS**: ✅ Compatible
- **Linux**: ✅ Compatible
- **Windows**: ⚠️ Requiere WSL o Git Bash

### **Permisos:**
```bash
# Hacer scripts ejecutables
chmod +x start-app.sh stop-app.sh
```

## 🆘 Solución de Problemas

### **Puerto Ocupado:**
```bash
# Verificar qué usa el puerto
lsof -i :5001
lsof -i :3000

# Detener manualmente
npm run stop
```

### **Proceso Zombi:**
```bash
# Buscar procesos
ps aux | grep python
ps aux | grep node

# Matar proceso específico
kill -9 <PID>
```

### **Logs de Error:**
```bash
# Ver logs del backend
cat backend.log

# Ver logs del frontend
cat frontend.log
```

## 📞 Soporte

Si tienes problemas con los scripts:
1. **Verificar permisos**: `chmod +x *.sh`
2. **Verificar dependencias**: Python3, Node.js, npm
3. **Revisar logs**: `backend.log` y `frontend.log`
4. **Reiniciar**: `npm run stop` y luego `npm start`
