import React, { useState } from 'react';

function AddProduct({ onAdd }) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    cantidad: '',
    precio: '',
    categoria: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitting(true);
      try {
        const result = await onAdd(formData);
        setMessage(result);
        
        if (result.success) {
          // Limpiar formulario solo si fue exitoso
          setFormData({
            nombre: '',
            descripcion: '',
            cantidad: '',
            precio: '',
            categoria: ''
          });
        }
        
        // Limpiar mensaje después de 3 segundos
        setTimeout(() => setMessage(null), 3000);
      } catch (error) {
        setMessage({ success: false, message: 'Error inesperado: ' + error.message });
        setTimeout(() => setMessage(null), 3000);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="card">
      <h2>➕ Agregar Nuevo Producto</h2>
      
      {message && (
        <div className={message.success ? 'success-message' : 'error-message'}>
          {message.message}
        </div>
      )}
      
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
            placeholder="Ej: Silla de Oficina"
            disabled={submitting}
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
            placeholder="Describe el producto..."
            rows="3"
            disabled={submitting}
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
            placeholder="0"
            min="1"
            disabled={submitting}
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
            placeholder="0.00"
            min="0.01"
            step="0.01"
            disabled={submitting}
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
            disabled={submitting}
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

        <button type="submit" className="btn" disabled={submitting} title="Crear nuevo producto en el inventario">
          {submitting ? '🔄 Guardando...' : '✅ Guardar Producto'}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
