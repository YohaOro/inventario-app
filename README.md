# 🏪 Sistema de Gestión de Inventario

Una aplicación completa para gestionar inventarios de manera eficiente y organizada, con backend en Python (Flask API) y frontend en React.

## 🚀 Características

### Backend (Python/Flask API)
- ✅ API REST completa para gestión de productos (CRUD)
- ✅ Base de datos SQLite3 con 15 productos de ejemplo
- ✅ Validación de datos robusta
- ✅ Endpoints para búsqueda, estadísticas y reportes
- ✅ CORS configurado para comunicación con frontend
- ✅ Script de inicialización automática de base de datos

### Frontend (React)
- 🎨 Interfaz moderna y responsiva
- 📱 Diseño adaptable a diferentes dispositivos
- 🔍 Búsqueda avanzada de productos
- 📊 Reportes visuales de stock en tiempo real
- ✏️ Edición en tiempo real con validación
- 🎯 Navegación por pestañas intuitiva
- 🔄 Conexión real con backend API

## 🏗️ Estructura del Proyecto

```
inventario-app/
├── backend/                 # Backend en Python/Flask
│   ├── api.py              # API REST Flask (puerto 5001)
│   ├── init_db.py          # Script de inicialización BD
│   ├── requirements.txt    # Dependencias de Python
│   └── src/                # Código fuente CLI (legacy)
├── frontend/                # Frontend en React
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   │   ├── ProductList.js
│   │   │   ├── AddProduct.js
│   │   │   ├── EditProduct.js
│   │   │   ├── SearchProduct.js
│   │   │   └── LowStockReport.js
│   │   ├── services/
│   │   │   └── api.js      # Servicio API (puerto 5001)
│   │   ├── App.js          # Componente principal
│   │   ├── index.js        # Punto de entrada React
│   │   └── index.css       # Estilos principales
│   ├── public/
│   │   └── index.html      # HTML principal
│   └── package.json        # Dependencias de Node.js
├── inventario.db           # Base de datos SQLite
└── README.md               # Este archivo
```

## 🛠️ Requisitos

### Backend
- Python 3.7+
- pip (gestor de paquetes)

### Frontend
- Node.js 16+
- npm o yarn

---

## 🚀 Guía completa para ejecutar el proyecto

### ** PASO 1: Clonar/Actualizar el repositorio**

```bash
# Si es la primera vez:
git clone https://github.com/YohaOro/inventario-app.git
cd inventario-app

# Si ya tienes el proyecto:
git pull origin master
```

### ** PASO 2: Configurar el Backend (Python/Flask)**

```bash
# Navegar al directorio backend
cd backend

# Instalar dependencias Python
pip install -r requirements.txt

# Inicializar la base de datos (crear tabla y datos de ejemplo)
python3 init_db.py

# Ejecutar la API Flask en puerto 5001
python3 api.py
```

**✅ Verificación del backend:**
```bash
# En otra terminal, verificar que esté funcionando
curl http://localhost:5001/api/health
```

### **⚛️ PASO 3: Configurar el Frontend (React)**

```bash
# Abrir nueva terminal y navegar al directorio frontend
cd frontend

# Instalar dependencias de Node.js
npm install

# Ejecutar la aplicación React en puerto 3000
npm start
```

**✅ Verificación del frontend:**
```bash
# En otra terminal, verificar que esté funcionando
curl http://localhost:3000
```

### **🌐 PASO 4: Acceder a la aplicación**

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001/api

---

## 📱 Funcionalidades disponibles

✅ **Lista de productos** (15 productos de ejemplo)  
✅ **Agregar nuevos productos**  
✅ **Editar productos existentes**  
✅ **Eliminar productos**  
✅ **Buscar productos**  
✅ **Reporte de bajo stock**  
✅ **Estadísticas del inventario en tiempo real**  

---

## 🔍 Solución de problemas comunes

### **❌ Error: "Port 5000 is in use"**
```bash
# El puerto 5000 está ocupado por AirPlay Receiver en macOS
# Solución: Usar puerto 5001 (ya configurado)
```

### **❌ Error: "no such table: productos"**
```bash
# Ejecutar el script de inicialización:
cd backend
python3 init_db.py
```

### **❌ Error: "Failed to fetch" en frontend**
```bash
# Verificar que el backend esté ejecutándose:
curl http://localhost:5001/api/health
```

### **❌ Error: "react-scripts: command not found"**
```bash
# Instalar dependencias del frontend:
cd frontend
npm install
```

---

## 📁 Estructura del proyecto:
```
inventario-app/
├── backend/
│   ├── api.py              # API Flask (puerto 5001)
│   ├── init_db.py          # Script de inicialización BD
│   └── requirements.txt    # Dependencias Python
├── frontend/
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   └── services/
│   │       └── api.js      # Servicio API (puerto 5001)
│   └── package.json        # Configuración React
└── inventario.db           # Base de datos SQLite
```

---

## ⚡ Comandos rápidos (desde la raíz del proyecto)

```bash
# Terminal 1 - Backend
cd backend && python3 api.py

# Terminal 2 - Frontend  
cd frontend && npm start

# Verificar ambos servicios
curl http://localhost:5001/api/health  # Backend
curl http://localhost:3000             # Frontend
```

---

## Resumen de puertos
- **Backend API**: Puerto 5001
- **Frontend React**: Puerto 3000
- **Base de datos**: SQLite local

---

## 🎯 Funcionalidades

### Gestión de Productos
- **Agregar**: Registrar nuevos productos con validación
- **Visualizar**: Lista completa de productos con filtros
- **Editar**: Modificar información de productos existentes
- **Eliminar**: Remover productos del inventario
- **Buscar**: Búsqueda por nombre, categoría o descripción

### Reportes
- **Bajo Stock**: Productos con menos de 10 unidades
- **Estado del Inventario**: Resumen general del stock
- **Categorías**: Organización por tipo de producto

### Categorías Predefinidas
- 🪑 Mueblería
- 🌱 Jardinería
- 🏢 Oficina

## 🎨 Características del Frontend

- **Diseño Responsivo**: Se adapta a móviles, tablets y desktop
- **Navegación por Pestañas**: Interfaz intuitiva y organizada
- **Validación en Tiempo Real**: Feedback inmediato al usuario
- **Estados Visuales**: Indicadores claros de stock y estado
- **Búsqueda Avanzada**: Filtros múltiples para encontrar productos
- **Conexión Real**: Integración completa con backend API

## 🔧 Tecnologías Utilizadas

### Backend
- **Python 3**: Lenguaje principal
- **Flask**: Framework web para API REST
- **Flask-CORS**: Soporte para CORS
- **SQLite3**: Base de datos ligera y eficiente

### Frontend
- **React 18**: Biblioteca de interfaz de usuario
- **CSS3**: Estilos modernos y responsivos
- **JavaScript ES6+**: Funcionalidades avanzadas
- **Fetch API**: Comunicación con backend

## 📱 Capturas de Pantalla

La aplicación incluye:
- Interfaz principal con navegación por pestañas
- Formularios de entrada con validación
- Tablas de datos organizadas y legibles
- Reportes visuales con indicadores de color
- Diseño adaptativo para diferentes dispositivos
- Estadísticas en tiempo real del inventario

## 🚀 Próximas Mejoras

- [x] Conexión real entre frontend y backend
- [x] API REST completa
- [x] Base de datos con datos de ejemplo
- [ ] Autenticación de usuarios
- [ ] Historial de cambios
- [ ] Exportación de reportes (PDF, Excel)
- [ ] Notificaciones de bajo stock
- [ ] Gráficos y estadísticas avanzadas

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Soporte

Si tienes preguntas o problemas:
- Abre un issue en GitHub
- Revisa la documentación
- Contacta al equipo de desarrollo

---

**¡Disfruta gestionando tu inventario de manera eficiente! 🎉** 