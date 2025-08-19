const categoryColors = {
  'Tecnología': '#007bff',
  'Accesorios': '#6f42c1',
  'Oficina': '#17a2b8',
  'Hogar': '#ffcce6',
  'Deportes': '#6c757d',
  'Ropa': '#6f42c1',
  'Juguetes': '#e83e8c',
  'Libros': '#20c997',
  'Música': '#6c757d',
  'Cocina': '#795548',
  'Jardín': '#4caf50',
  'Automotriz': '#607d8b',
  'Salud': '#e83e8c',
  'Belleza': '#9e9e9e',
  'Mascotas': '#6f42c1',
  'Sin categoría': '#6c757d'
};

export const getCategoryColor = (category) => {
  return categoryColors[category] || '#6c757d';
};

export const getAvailableCategories = () => {
  return Object.keys(categoryColors);
};

export const generateRandomColor = () => {
  const colors = [
    '#007bff', '#28a745', '#ffc107', '#dc3545', '#fd7e14',
    '#6f42c1', '#e83e8c', '#20c997', '#6c757d', '#17a2b8',
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const getOrGenerateCategoryColor = (category) => {
  if (categoryColors[category]) {
    return categoryColors[category];
  }
  
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
