# 🎨 Assets - Recursos Visuales

Esta carpeta contiene todos los recursos visuales del proyecto Sistema de Inventario.

## 📁 Estructura

```
assets/
├── images/          # Imágenes del proyecto
│   ├── logos/       # Logos y marcas
│   ├── screenshots/ # Capturas de pantalla
│   └── backgrounds/ # Imágenes de fondo
├── icons/           # Iconos y símbolos
│   ├── ui/          # Iconos de interfaz
│   ├── categories/  # Iconos por categoría
│   └── actions/     # Iconos de acciones
└── README.md        # Este archivo
```

## 🖼️ Tipos de Archivos Soportados

### Imágenes
- **Formatos:** PNG, JPG, JPEG, SVG, WebP
- **Resolución recomendada:** Mínimo 72 DPI para web
- **Tamaño máximo:** 2MB por archivo

### Iconos
- **Formatos:** SVG (preferido), PNG, ICO
- **Tamaño estándar:** 16x16, 24x24, 32x32, 48x48, 64x64
- **Estilo:** Consistente con el diseño del proyecto

## 📝 Convenciones de Nomenclatura

- **Imágenes:** `nombre-descriptivo.ext` (ej: `logo-inventario.png`)
- **Iconos:** `tipo-accion.ext` (ej: `ui-add.svg`, `category-furniture.svg`)
- **Usar guiones medios** en lugar de espacios o guiones bajos
- **Nombres en minúsculas** para consistencia

## 🔗 Uso en el Proyecto

### Frontend (React)
```jsx
// Importar imagen
import logo from '../assets/images/logos/logo-inventario.png';

// Usar en componente
<img src={logo} alt="Logo Inventario" />
```

### Backend (Flask)
```python
# Servir archivos estáticos
@app.route('/assets/<path:filename>')
def serve_asset(filename):
    return send_from_directory('assets', filename)
```

## 📊 Organización por Categoría

### 🏪 Mueblería
- Iconos de sillas, mesas, sofás, camas
- Imágenes de productos de mueblería

### 🌱 Jardinería
- Iconos de plantas, macetas, herramientas
- Imágenes de productos de jardinería

### 🏢 Oficina
- Iconos de computadoras, impresoras, escritorios
- Imágenes de productos de oficina

## 🚀 Próximos Pasos

- [ ] Agregar logo principal del proyecto
- [ ] Crear iconos para cada categoría de producto
- [ ] Diseñar iconos para acciones (agregar, editar, eliminar)
- [ ] Optimizar imágenes para web
- [ ] Crear favicon personalizado

## 📚 Recursos Útiles

- **Iconos gratuitos:** [Feather Icons](https://feathericons.com/), [Heroicons](https://heroicons.com/)
- **Optimización:** [TinyPNG](https://tinypng.com/), [Squoosh](https://squoosh.app/)
- **Diseño:** [Figma](https://figma.com/), [Canva](https://canva.com/)

---

*Mantén esta carpeta organizada para facilitar el desarrollo y mantenimiento del proyecto.*
