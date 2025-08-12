# 🚀 Guía de Despliegue en Render

## 📋 Requisitos Previos

- Cuenta en [Render.com](https://render.com) (gratuita)
- Repositorio en GitHub con tu aplicación
- Acceso a la rama `deploy`

## 🎯 Pasos para el Despliegue

### 1. Conectar GitHub a Render

1. Ve a [render.com](https://render.com) y crea una cuenta
2. Haz clic en "New +" y selecciona "Blueprint"
3. Conecta tu cuenta de GitHub
4. Selecciona el repositorio `inventario-app`
5. Selecciona la rama `deploy`

### 2. Configuración Automática

Render detectará automáticamente el archivo `render.yaml` y configurará:
- ✅ Backend Python/Flask
- ✅ Base de datos PostgreSQL
- ✅ Frontend React
- ✅ Variables de entorno
- ✅ SSL automático

### 3. Variables de Entorno

Render configurará automáticamente:
- `DATABASE_URL`: Conexión a PostgreSQL
- `FLASK_ENV`: production
- `FLASK_DEBUG`: false
- `PORT`: Puerto asignado por Render

### 4. URLs de Acceso

Una vez desplegado, tendrás:
- **Frontend**: `https://inventario-frontend.onrender.com`
- **Backend**: `https://inventario-backend.onrender.com`
- **Base de datos**: PostgreSQL gestionada por Render

## 🔧 Configuración Local

Para desarrollo local, crea un archivo `.env` basado en `env.example`:

```bash
cp env.example .env
```

## 📊 Estructura del Despliegue

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   PostgreSQL    │
│   (React)       │◄──►│   (Flask)       │◄──►│   Database      │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚨 Solución de Problemas

### Error de conexión a la base de datos
- Verifica que `DATABASE_URL` esté configurada
- Espera 2-3 minutos después del primer despliegue

### Frontend no carga
- Verifica que `REACT_APP_API_URL` apunte al backend correcto
- Revisa los logs en Render

### API no responde
- Verifica que el backend esté ejecutándose
- Revisa los logs del servicio backend

## 📱 Acceso Público

Una vez desplegado, tu aplicación será accesible desde cualquier lugar del mundo con las URLs proporcionadas por Render.

## 🔄 Actualizaciones

Para actualizar la aplicación:
1. Haz cambios en la rama `deploy`
2. Haz push a GitHub
3. Render desplegará automáticamente

## 💰 Costos

- **Plan gratuito**: 750 horas/mes (suficiente para 24/7)
- **Base de datos**: 1GB de almacenamiento incluido
- **SSL**: Certificado automático incluido
- **Dominio**: Subdominio `.onrender.com` incluido
