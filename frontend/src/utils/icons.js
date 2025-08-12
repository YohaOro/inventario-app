// 🎨 Utilidades para iconos del proyecto
// Este archivo centraliza la importación de todos los iconos SVG

// Iconos de acciones UI
export const UI_ICONS = {
  add: '/assets/icons/ui/add.svg',
  edit: '/assets/icons/ui/edit.svg',
  delete: '/assets/icons/ui/delete.svg',
  search: '/assets/icons/ui/search.svg',
  close: '/assets/icons/ui/close.svg',
  menu: '/assets/icons/ui/menu.svg',
  home: '/assets/icons/ui/home.svg',
  settings: '/assets/icons/ui/settings.svg',
  user: '/assets/icons/ui/user.svg',
  logout: '/assets/icons/ui/logout.svg'
};

// Iconos de categorías
export const CATEGORY_ICONS = {
  furniture: '/assets/icons/categories/furniture.svg',
  gardening: '/assets/icons/categories/gardening.svg',
  office: '/assets/icons/categories/office.svg'
};

// Función para obtener el icono por nombre
export const getIcon = (iconName, type = 'ui') => {
  if (type === 'category') {
    return CATEGORY_ICONS[iconName] || CATEGORY_ICONS.furniture;
  }
  return UI_ICONS[iconName] || UI_ICONS.add;
};

// Función para obtener icono de categoría por nombre
export const getCategoryIcon = (categoryName) => {
  const categoryMap = {
    'Mueblería': 'furniture',
    'Jardinería': 'gardening',
    'Oficina': 'office'
  };
  
  const iconKey = categoryMap[categoryName] || 'furniture';
  return CATEGORY_ICONS[iconKey];
};

// Componente de icono reutilizable (para usar en React)
export const Icon = ({ name, type = 'ui', className = '', size = 24, ...props }) => {
  const iconSrc = getIcon(name, type);
  
  return (
    <img
      src={iconSrc}
      alt={`Icono ${name}`}
      className={className}
      width={size}
      height={size}
      {...props}
    />
  );
};

export default {
  UI_ICONS,
  CATEGORY_ICONS,
  getIcon,
  getCategoryIcon,
  Icon
};
