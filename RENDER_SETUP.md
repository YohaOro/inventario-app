# 🚀 Configuración Detallada de Render para el Backend

## 📋 Pasos Paso a Paso

### **1. Crear Cuenta en Render**
- Ir a [render.com](https://render.com)
- Hacer clic en **"Get Started"**
- Seleccionar **"Continue with GitHub"**
- Autorizar Render para acceder a tu repositorio

### **2. Crear Nuevo Web Service**
- En el dashboard, hacer clic en **"New +"**
- Seleccionar **"Web Service"**
- Hacer clic en **"Connect a repository"**
- Buscar y seleccionar: `YohaOro/inventario-app`

### **3. Configuración del Servicio**
```
Name: inventario-app-backend
Branch: deploy
Root Directory: (dejar vacío)
Runtime: Python 3
Build Command: pip install -r backend/requirements.txt
Start Command: cd backend && gunicorn api:app --bind 0.0.0.0:$PORT
Health Check Path: /api/health
```

### **4. Configuraciones Adicionales**
- ✅ **Auto-Deploy**: Activado
- ✅ **Health Check**: Activado
- ✅ **Environment Variables**: Por defecto

### **5. Crear Servicio**
- Hacer clic en **"Create Web Service"**
- Render comenzará el deploy automáticamente

## 🔍 Verificación del Deploy

### **Build Logs:**
- Verificar que no hay errores en la instalación de dependencias
- Confirmar que gunicorn se inicia correctamente

### **Health Check:**
- Render verificará automáticamente `/api/health`
- Debe devolver status 200

### **URL del Servicio:**
- Render asignará una URL como: `https://inventario-app-backend.onrender.com`
- Esta URL será tu backend en producción

## 🧪 Testing Post-Deploy

### **1. Health Check:**
```bash
curl https://inventario-app-backend.onrender.com/api/health
```

### **2. Productos:**
```bash
curl https://inventario-app-backend.onrender.com/api/products
```

### **3. Estadísticas:**
```bash
curl https://inventario-app-backend.onrender.com/api/statistics
```

## ⚠️ Posibles Problemas y Soluciones

### **Error: Build Failed**
- Verificar que `backend/requirements.txt` existe
- Confirmar que `backend/api.py` existe
- Revisar logs de build en Render

### **Error: Health Check Failed**
- Verificar que el servicio esté ejecutándose
- Revisar logs del servicio en Render
- Confirmar que `/api/health` devuelva JSON válido

### **Error: Port Binding**
- El comando ya incluye `--bind 0.0.0.0:$PORT`
- Render maneja automáticamente la variable `$PORT`

## 🎯 Estado Esperado

Una vez configurado correctamente:
- ✅ Backend funcionando en Render
- ✅ Health checks pasando
- ✅ Endpoints respondiendo correctamente
- ✅ Frontend configurado para usar la nueva URL
- ✅ Aplicación completamente funcional en producción
