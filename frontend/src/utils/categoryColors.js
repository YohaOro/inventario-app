// Sistema de colores para categorías de productos
const categoryColors = {
  'Tecnología': '#007bff',      // Azul
  'Accesorios': '#6f42c1',      // Púrpura
  'Oficina': '#17a2b8',         // Azul claro
  'Hogar': '#ffcce6',           // Rosa pastel muy claro
  'Deportes': '#6c757d',        // Gris
  'Ropa': '#6f42c1',            // Púrpura
  'Juguetes': '#e83e8c',        // Rosa
  'Libros': '#20c997',          // Verde azulado
  'Música': '#6c757d',          // Gris
  'Cocina': '#795548',          // Marrón
  'Jardín': '#4caf50',          // Verde azulado
  'Automotriz': '#607d8b',      // Azul gris
  'Salud': '#e83e8c',           // Rosa
  'Belleza': '#9e9e9e',         // Gris medio
  'Mascotas': '#6f42c1',        // Púrpura
  'Sin categoría': '#6c757d'    // Gris
};

// Función para obtener el color de una categoría
export const getCategoryColor = (category) => {
  return categoryColors[category] || '#6c757d'; // Gris por defecto
};

// Función para obtener todas las categorías disponibles
export const getAvailableCategories = () => {
  return Object.keys(categoryColors);
};

// Función para generar un color aleatorio si la categoría no existe
export const generateRandomColor = () => {
  const colors = [
    '#007bff', '#28a745', '#ffc107', '#dc3545', '#fd7e14',
    '#6f42c1', '#e83e8c', '#20c997', '#6c757d', '#17a2b8',
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Función para obtener o generar un color para una categoría
export const getOrGenerateCategoryColor = (category) => {
  if (categoryColors[category]) {
    return categoryColors[category];
  }
  
  // Generar un color basado en el hash de la categoría para consistencia
  const hash = category.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const colors = [
    '#007bff', '#28a745', '#ffc107', '#dc3545', '#fd7e14',
    '#6f42c1', '#e83e8c', '#20c997', '#6c757d', '#17a2b8',
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'
  ];
  
  return colors[Math.abs(hash) % colors.length];
};

export default categoryColors;
