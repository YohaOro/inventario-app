import React, { useState } from 'react';
import DescriptionModal from './DescriptionModal';

const TruncatedDescription = ({ description, productName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const maxLength = 40; // Longitud máxima antes de truncar
  
  // Si no hay descripción, mostrar mensaje
  if (!description) {
    return <span style={{ color: '#999' }}>Sin descripción</span>;
  }
  
  // Si la descripción es corta, mostrarla completa pero clickeable
  if (description.length <= maxLength) {
    return (
      <>
        <span 
          style={{ cursor: 'pointer' }}
          onClick={() => setIsModalOpen(true)}
          title="Click para ver descripción completa"
        >
          {description}
        </span>
        <DescriptionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          description={description}
          productName={productName}
        />
      </>
    );
  }
  
  // Si es larga, truncar y hacer clickeable
  const truncatedText = description.substring(0, maxLength) + '...';
  return (
    <>
      <span 
        style={{ cursor: 'pointer' }}
        onClick={() => setIsModalOpen(true)}
        title="Click para ver descripción completa"
      >
        {truncatedText}
      </span>
      <DescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        description={description}
        productName={productName}
      />
    </>
  );
};

export default TruncatedDescription;
