import React from 'react';

const TruncatedDescription = ({ description }) => {
  const maxLength = 40; // Longitud máxima antes de truncar
  
  // Si no hay descripción, mostrar mensaje
  if (!description) {
    return <span style={{ color: '#999' }}>Sin descripción</span>;
  }
  
  // Si la descripción es corta, mostrarla completa
  if (description.length <= maxLength) {
    return <span>{description}</span>;
  }
  
  // Si es larga, truncar y agregar 3 puntos
  const truncatedText = description.substring(0, maxLength) + '...';
  return <span>{truncatedText}</span>;
};

export default TruncatedDescription;
