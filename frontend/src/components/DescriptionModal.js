import React from 'react';

const DescriptionModal = ({ isOpen, onClose, description, productName }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body">
          <p>{description || 'Sin descripción'}</p>
        </div>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default DescriptionModal;
