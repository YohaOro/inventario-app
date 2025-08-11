# 🏪 Sistema de Gestión de Inventario

Una aplicación completa para gestionar inventarios de manera eficiente y organizada, con backend en Python y frontend en React.

## 🚀 Características

### Backend (Python)
- ✅ Gestión completa de productos (CRUD)
- ✅ Base de datos SQLite3
- ✅ Validación de datos
- ✅ Interfaz de línea de comandos con colores
- ✅ Reportes de bajo stock
- ✅ Búsqueda por nombre, categoría y descripción

### Frontend (React)
- 🎨 Interfaz moderna y responsiva
- 📱 Diseño adaptable a diferentes dispositivos
- 🔍 Búsqueda avanzada de productos
- 📊 Reportes visuales de stock
- ✏️ Edición en tiempo real
- 🎯 Navegación por pestañas intuitiva

## 🏗️ Estructura del Proyecto

```
inventario-app/
├── backend/                 # Backend en Python
│   ├── src/
│   │   ├── db/
│   │   │   └── database.py  # Operaciones de base de datos
│   │   ├── ui/
│   │   │   └── menu.py      # Interfaz de línea de comandos
│   │   └── main.py          # Punto de entrada principal
│   ├── inventario.db        # Base de datos SQLite
│   └── requirements.txt     # Dependencias de Python
├── frontend/                # Frontend en React
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── App.js          # Componente principal
│   │   ├── index.js        # Punto de entrada React
│   │   └── index.css       # Estilos principales
│   ├── public/
│   │   └── index.html      # HTML principal
│   └── package.json        # Dependencias de Node.js
└── README.md               # Este archivo
```

## 🛠️ Requisitos

### Backend
- Python 3.7+
- pip (gestor de paquetes)

### Frontend
- Node.js 14+
- npm o yarn

## 📦 Instalación y Uso

### 1. Backend (Python)

```bash
# Navegar al directorio del backend
cd backend

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar la aplicación
python3 src/main.py
```

### 2. Frontend (React)

```bash
# Navegar al directorio del frontend
cd frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start
```

El frontend se abrirá automáticamente en `http://localhost:3000`

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
- 💻 Electrónicos
- 📦 Otros

## 🎨 Características del Frontend

- **Diseño Responsivo**: Se adapta a móviles, tablets y desktop
- **Navegación por Pestañas**: Interfaz intuitiva y organizada
- **Validación en Tiempo Real**: Feedback inmediato al usuario
- **Estados Visuales**: Indicadores claros de stock y estado
- **Búsqueda Avanzada**: Filtros múltiples para encontrar productos

## 🔧 Tecnologías Utilizadas

### Backend
- **Python 3**: Lenguaje principal
- **SQLite3**: Base de datos ligera y eficiente
- **colorama**: Colores en terminal para mejor UX

### Frontend
- **React 18**: Biblioteca de interfaz de usuario
- **CSS3**: Estilos modernos y responsivos
- **JavaScript ES6+**: Funcionalidades avanzadas

## 📱 Capturas de Pantalla

La aplicación incluye:
- Interfaz principal con navegación por pestañas
- Formularios de entrada con validación
- Tablas de datos organizadas y legibles
- Reportes visuales con indicadores de color
- Diseño adaptativo para diferentes dispositivos

## 🚀 Próximas Mejoras

- [ ] Conexión real entre frontend y backend
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