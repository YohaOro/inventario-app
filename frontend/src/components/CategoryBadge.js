import React from 'react';
import { getOrGenerateCategoryColor } from '../utils/categoryColors';
import './CategoryBadge.css';

const CategoryBadge = React.memo(({ category, size = 'small' }) => {
  const backgroundColor = getOrGenerateCategoryColor(category);
  
  return (
    <span 
      className={`category-badge category-badge-${size}`}
      style={{ backgroundColor }}
    >
      {category}
    </span>
  );
});

export default CategoryBadge;
