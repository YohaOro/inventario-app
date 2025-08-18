# 🚀 Deploy del Backend en Render

## Opción 1: Render (Recomendado)

### 1. Crear cuenta en Render
- Ir a [render.com](https://render.com)
- Crear cuenta con GitHub

### 2. Crear nuevo Web Service
- **Name**: `inventario-app-backend`
- **Environment**: `Python 3`
- **Build Command**: `pip install -r backend/requirements.txt`
- **Start Command**: `cd backend && gunicorn api:app`
- **Health Check Path**: `/api/health`

### 3. Conectar repositorio
- Seleccionar `YohaOro/inventario-app`
- Branch: `deploy`
- Auto-deploy: ✅

## Opción 2: Railway

### 1. Crear cuenta en Railway
- Ir a [railway.app](https://railway.app)
- Conectar con GitHub

### 2. Deploy automático
- Seleccionar repositorio
- Railway detectará automáticamente Python
- Deploy automático en cada push

## Opción 3: Heroku

### 1. Crear cuenta en Heroku
- Ir a [heroku.com](https://heroku.com)
- Conectar con GitHub

### 2. Deploy
- Crear nueva app
- Conectar repositorio
- Deploy automático

## 🔧 Configuración

El frontend ya está configurado para usar:
- **Desarrollo**: `http://localhost:5001/api`
- **Producción**: `https://inventario-app-backend.onrender.com/api`

## 📊 Verificación

Una vez deployado, verificar:
- `/api/health` - Health check
- `/api/products` - Lista de productos
- `/api/statistics` - Estadísticas
