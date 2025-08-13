import React, { useState, useEffect } from 'react';

function EditProduct({ product, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    cantidad: '',
    precio: '',
    categoria: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre || '',
        descripcion: product.descripcion || '',
        cantidad: product.cantidad || '',
        precio: product.precio || '',
        categoria: product.categoria || ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }
    
    if (!formData.cantidad || formData.cantidad <= 0) {
      newErrors.cantidad = 'La cantidad debe ser mayor a 0';
    }
    
    if (!formData.precio || formData.precio <= 0) {
      newErrors.precio = 'El precio debe ser mayor a 0';
    }
    
    if (!formData.categoria.trim()) {
      newErrors.categoria = 'La categoría es obligatoria';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const updatedProduct = {
        ...product,
        ...formData,
        cantidad: parseInt(formData.cantidad),
        precio: parseFloat(formData.precio)
      };
      
      onUpdate(updatedProduct);
    }
  };

  if (!product) {
    return <div className="card">Producto no encontrado</div>;
  }

  return (
    <div className="card">
      <h2>✏️ Editar Producto: {product.nombre}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre del Producto *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className={`form-control ${errors.nombre ? 'error' : ''}`}
            value={formData.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <span className="error-message">{errors.nombre}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            className="form-control"
            value={formData.descripcion}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cantidad">Cantidad en Stock *</label>
          <input
            type="number"
            id="cantidad"
            name="cantidad"
            className={`form-control ${errors.cantidad ? 'error' : ''}`}
            value={formData.cantidad}
            onChange={handleChange}
            min="1"
          />
          {errors.cantidad && <span className="error-message">{errors.cantidad}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="precio">Precio Unitario *</label>
          <input
            type="number"
            id="precio"
            name="precio"
            className={`form-control ${errors.precio ? 'error' : ''}`}
            value={formData.precio}
            onChange={handleChange}
            min="0.01"
            step="0.01"
          />
          {errors.precio && <span className="error-message">{errors.precio}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoría *</label>
          <select
            id="categoria"
            name="categoria"
            className={`form-control ${errors.categoria ? 'error' : ''}`}
            value={formData.categoria}
            onChange={handleChange}
          >
            <option value="">Selecciona una categoría</option>
            <option value="Mueblería">Mueblería</option>
            <option value="Jardinería">Jardinería</option>
            <option value="Oficina">Oficina</option>
            <option value="Electrónicos">Electrónicos</option>
            <option value="Otros">Otros</option>
          </select>
          {errors.categoria && <span className="error-message">{errors.categoria}</span>}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn" title="Guardar cambios del producto">
            💾 Actualizar Producto
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel} title="Cancelar edición">
            ❌ Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
