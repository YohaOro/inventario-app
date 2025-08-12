import React from 'react';
import { Icon, getCategoryIcon, UI_ICONS, CATEGORY_ICONS } from '../utils/icons';

const IconExample = () => {
  return (
    <div className="icon-example">
      <h2>🎨 Ejemplos de Uso de Iconos</h2>
      
      <section>
        <h3>Iconos de Acciones UI</h3>
        <div className="icon-grid">
          <div className="icon-item">
            <Icon name="add" size={32} />
            <span>Agregar</span>
          </div>
          <div className="icon-item">
            <Icon name="edit" size={32} />
            <span>Editar</span>
          </div>
          <div className="icon-item">
            <Icon name="delete" size={32} />
            <span>Eliminar</span>
          </div>
        </div>
      </section>
      
      <section>
        <h3>Iconos de Categorías</h3>
        <div className="icon-grid">
          <div className="icon-item">
            <Icon name="furniture" type="category" size={32} />
            <span>Mueblería</span>
          </div>
          <div className="icon-item">
            <Icon name="gardening" type="category" size={32} />
            <span>Jardinería</span>
          </div>
          <div className="icon-item">
            <Icon name="office" type="category" size={32} />
            <span>Oficina</span>
          </div>
        </div>
      </section>
      
      <section>
        <h3>Uso Programático</h3>
        <div className="code-example">
          <p><strong>Obtener icono por categoría:</strong></p>
          <code>
            const iconSrc = getCategoryIcon('Mueblería');
          </code>
          
          <p><strong>Obtener icono UI:</strong></p>
          <code>
            const iconSrc = getIcon('add', 'ui');
          </code>
        </div>
      </section>
      
      <style jsx>{`
        .icon-example {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .icon-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 20px;
          margin: 20px 0;
        }
        
        .icon-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 15px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          background: #f9f9f9;
        }
        
        .icon-item span {
          margin-top: 8px;
          font-size: 14px;
          color: #666;
        }
        
        .code-example {
          background: #f5f5f5;
          padding: 15px;
          border-radius: 5px;
          margin: 15px 0;
        }
        
        .code-example code {
          background: #e0e0e0;
          padding: 5px 8px;
          border-radius: 3px;
          font-family: monospace;
        }
      `}</style>
    </div>
  );
};

export default IconExample;
