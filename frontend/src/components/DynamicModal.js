import React from 'react';
import './DynamicModal.css';

const DynamicModal = ({ 
  isOpen, 
  onClose, 
  type = 'default',
  title,
  content,
  actions,
  showCloseButton = true,
  closeButtonText = '✕'
}) => {
  if (!isOpen) return null;

  const renderContent = () => {
    switch (type) {
      case 'description':
        return (
          <div className="modal-body">
            <p className="description-text-modal">{content || 'Sin descripción'}</p>
          </div>
        );
      
      case 'delete-confirmation':
        return (
          <>
            <div className="delete-icon">🗑️</div>
            <h3>{title || 'Confirmar Eliminación'}</h3>
            <p>{content}</p>
            <p className="warning-text">
              ⚠️ Esta acción no se puede deshacer.
            </p>
            <div className="modal-actions">
              {actions}
            </div>
          </>
        );
      
      case 'success':
        return (
          <>
            <div className="success-icon">✅</div>
            <h3>{title || '¡Éxito!'}</h3>
            <p>{content}</p>
            <div className="modal-actions">
              {actions}
            </div>
          </>
        );
      
      default:
        return (
          <>
            {title && <h3>{title}</h3>}
            <div className="modal-body">
              {content}
            </div>
            {actions && (
              <div className="modal-actions">
                {actions}
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {showCloseButton && (
          <button className="modal-close-btn" onClick={onClose} title="Cerrar">
            {closeButtonText}
          </button>
        )}
        {renderContent()}
      </div>
    </div>
  );
};

export default DynamicModal;
