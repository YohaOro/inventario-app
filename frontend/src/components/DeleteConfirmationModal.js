import React, { useState } from 'react';
import './DeleteConfirmationModal.css';

const DeleteConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  productName, 
  isDeleting = false,
  showSuccess = false 
}) => {
  console.log('DeleteConfirmationModal props:', { isOpen, showSuccess, productName });
  
  if (!isOpen) return null;

  if (showSuccess) {
    return (
      <div className="delete-modal-overlay">
        <div className="delete-modal-content success">
          <div className="success-icon">✅</div>
          <h3>¡Producto Eliminado!</h3>
          <p>El producto "{productName}" ha sido eliminado permanentemente.</p>
          <button 
            className="btn btn-primary close-btn"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal-content">
        <div className="delete-icon">🗑️</div>
        <h3>Confirmar Eliminación</h3>
        <p>
          ¿Estás seguro de que quieres eliminar el producto 
          <strong> "{productName}"</strong>?
        </p>
        <p className="warning-text">
          ⚠️ Esta acción no se puede deshacer.
        </p>
        
        <div className="modal-actions">
          <button 
            className="btn btn-secondary cancel-btn"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancelar
          </button>
          <button 
            className="btn btn-danger confirm-btn"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Eliminando...' : 'Eliminar Permanente'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
