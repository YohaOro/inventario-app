# 🚀 Sistema de Gestión de Inventario

Una aplicación completa de gestión de inventario con backend en Flask y frontend en React.

## ✨ Características

- **Backend API REST** en Flask (Python)
- **Frontend** en React con interfaz moderna
- **Base de datos SQLite** para almacenamiento local
- **Gestión completa de productos** (CRUD)
- **Búsqueda y filtros** avanzados
- **Reportes de bajo stock**
- **Estadísticas del inventario**

## 🏗️ Estructura del Proyecto

```
inventario-app/
├── backend/                 # API Flask
│   ├── api.py              # Servidor principal
│   ├── init_db.py          # Inicialización de BD
│   ├── run_server.sh       # Script de inicio
│   └── requirements.txt    # Dependencias Python
├── frontend/               # Aplicación React
│   ├── src/                # Código fuente
│   ├── public/             # Archivos públicos
│   └── package.json        # Dependencias Node.js
└── inventario.db           # Base de datos SQLite
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Python 3.8+
- Node.js 16+
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd inventario-app
```

### 2. Configurar el Backend
```bash
cd backend
pip install -r requirements.txt
```

### 3. Configurar el Frontend
```bash
cd frontend
npm install
```

## 🎯 Ejecutar la Aplicación

### Iniciar el Backend
```bash
cd backend
./run_server.sh
```
El servidor estará disponible en: http://localhost:5001

### Iniciar el Frontend
```bash
cd frontend
npm start
```
La aplicación estará disponible en: http://localhost:3000

## 📚 API Endpoints

- `GET /api/health` - Estado de la API
- `GET /api/products` - Listar productos
- `POST /api/products` - Crear producto
- `PUT /api/products/<id>` - Actualizar producto
- `DELETE /api/products/<id>` - Eliminar producto
- `GET /api/products/search` - Buscar productos
- `GET /api/statistics` - Estadísticas del inventario

## 🛠️ Tecnologías Utilizadas

- **Backend:** Flask, SQLite, Python
- **Frontend:** React, JavaScript, CSS
- **Base de Datos:** SQLite
- **APIs:** RESTful API

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. 