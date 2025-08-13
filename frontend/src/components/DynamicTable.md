# DynamicTable Component

Un componente de tabla dinámica y reutilizable que puede adaptarse a diferentes necesidades de visualización de datos.

## 🚀 Características

- **Reutilizable**: Una sola tabla para múltiples propósitos
- **Configurable**: Columnas personalizables con diferentes tipos de datos
- **Responsive**: Se adapta a diferentes tamaños de pantalla
- **Acciones**: Botones de acción configurables (ver, editar, eliminar)
- **Estilos consistentes**: Diseño moderno y uniforme
- **Tipos de datos**: Soporte para precios, cantidades, categorías, fechas, etc.

## 📋 Props

| Prop | Tipo | Descripción | Default |
|------|------|-------------|---------|
| `data` | Array | Array de objetos con los datos a mostrar | `[]` |
| `columns` | Array | Configuración de las columnas | `[]` |
| `title` | String | Título de la tabla | `null` |
| `emptyMessage` | String | Mensaje cuando no hay datos | `"No hay datos para mostrar"` |
| `onRowClick` | Function | Función llamada al hacer clic en una fila | `null` |
| `showActions` | Boolean | Mostrar columna de acciones | `false` |
| `onEdit` | Function | Función para editar un elemento | `null` |
| `onDelete` | Function | Función para eliminar un elemento | `null` |
| `onView` | Function | Función para ver detalles | `null` |
| `className` | String | Clase CSS adicional | `""` |

## 🏗️ Configuración de Columnas

Cada columna se define con un objeto que especifica cómo debe comportarse:

```javascript
const columns = [
  {
    key: 'nombre',           // Clave del objeto de datos
    label: 'Nombre',         // Etiqueta del header
    type: 'text',            // Tipo de dato
    width: '25%',            // Ancho de la columna
    className: 'custom-class', // Clase CSS adicional
    render: (value, item) => {  // Renderer personalizado
      return <CustomComponent value={value} item={item} />;
    }
  }
];
```

## 🎨 Tipos de Datos Soportados

### `text` (por defecto)
Renderiza el valor tal como está.

### `price`
Formatea el valor como precio con símbolo de moneda.
```javascript
{ key: 'precio', label: 'Precio', type: 'price' }
// Resultado: $25.99
```

### `quantity`
Renderiza como badge con colores según el stock.
```javascript
{ key: 'cantidad', label: 'Stock', type: 'quantity' }
// Resultado: Badge verde (stock normal) o rojo (bajo stock)
```

### `category`
Renderiza como badge con colores por categoría.
```javascript
{ key: 'categoria', label: 'Categoría', type: 'category' }
// Resultado: Badge con color específico de la categoría
```

### `status`
Renderiza como badge con colores por estado.
```javascript
{ key: 'estado', label: 'Estado', type: 'status' }
// Resultado: Badge con color según el estado
```

### `date`
Formatea como fecha local.
```javascript
{ key: 'fecha', label: 'Fecha', type: 'date' }
// Resultado: 15/12/2024
```

### `boolean`
Renderiza como checkmark o X.
```javascript
{ key: 'activo', label: 'Activo', type: 'boolean' }
// Resultado: ✅ Sí o ❌ No
```

## 💡 Ejemplos de Uso

### Tabla Básica
```javascript
<DynamicTable
  title="Lista de Productos"
  data={products}
  columns={[
    { key: 'nombre', label: 'Nombre', type: 'text' },
    { key: 'precio', label: 'Precio', type: 'price' },
    { key: 'categoria', label: 'Categoría', type: 'category' }
  ]}
/>
```

### Tabla con Acciones
```javascript
<DynamicTable
  title="Gestión de Productos"
  data={products}
  columns={productColumns}
  showActions={true}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onView={handleView}
/>
```

### Tabla con Renderer Personalizado
```javascript
<DynamicTable
  title="Productos con Descripción"
  data={products}
  columns={[
    { key: 'nombre', label: 'Nombre' },
    { 
      key: 'descripcion', 
      label: 'Descripción',
      render: (value, item) => (
        <div>
          <span>{value.substring(0, 50)}...</span>
          <button onClick={() => showFullDescription(item)}>
            Ver más
          </button>
        </div>
      )
    }
  ]}
/>
```

### Tabla con Eventos
```javascript
<DynamicTable
  title="Productos Seleccionables"
  data={products}
  columns={productColumns}
  onRowClick={(product) => {
    console.log('Producto seleccionado:', product);
    setSelectedProduct(product);
  }}
/>
```

## 🎯 Casos de Uso Comunes

### 1. **Inventario de Productos**
- Columnas: Nombre, Categoría, Stock, Precio, Descripción
- Acciones: Ver, Editar, Eliminar
- Tipos: text, category, quantity, price, text

### 2. **Estadísticas por Categoría**
- Columnas: Categoría, Total Productos, Valor Total
- Sin acciones
- Tipos: category, number, price

### 3. **Productos con Bajo Stock**
- Columnas: Producto, Stock Actual, Categoría
- Sin acciones
- Tipos: text, quantity, category

### 4. **Historial de Transacciones**
- Columnas: Fecha, Producto, Cantidad, Precio, Estado
- Acciones: Ver detalles
- Tipos: date, text, number, price, status

### 5. **Lista de Usuarios**
- Columnas: Nombre, Email, Rol, Activo, Fecha Registro
- Acciones: Editar, Eliminar
- Tipos: text, text, text, boolean, date

## 🔧 Personalización

### Estilos CSS
El componente incluye estilos CSS completos que puedes personalizar:
- Colores de badges
- Espaciado y tipografía
- Efectos hover y animaciones
- Responsive design

### Clases CSS
- `.dynamic-table-container` - Contenedor principal
- `.table-header` - Header de la tabla
- `.table-row` - Filas de datos
- `.table-cell` - Celdas de datos
- `.action-buttons` - Botones de acción

## 🚀 Ventajas

1. **Consistencia**: Todas las tablas tienen el mismo estilo
2. **Mantenibilidad**: Un solo componente para mantener
3. **Flexibilidad**: Fácil de adaptar a nuevas necesidades
4. **Reutilización**: Mismo código para diferentes tipos de datos
5. **Escalabilidad**: Fácil agregar nuevas funcionalidades

## 📱 Responsive

El componente se adapta automáticamente a dispositivos móviles:
- Scroll horizontal en pantallas pequeñas
- Botones de acción apilados verticalmente
- Tamaños de fuente ajustados
- Espaciado optimizado para móviles
