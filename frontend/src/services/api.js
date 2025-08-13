// Servicio para conectar con la API REST del backend
import { API_BASE_URL, API_CONFIG } from '../config/api';

class ApiService {
  // Método genérico para hacer peticiones HTTP
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Obtener todos los productos
  async getProducts() {
    return this.request('/products');
  }

  // Obtener un producto por ID
  async getProduct(id) {
    return this.request(`/products/${id}`);
  }

  // Crear un nuevo producto
  async createProduct(productData) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  // Actualizar un producto existente
  async updateProduct(id, productData) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  // Eliminar un producto
  async deleteProduct(id) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Buscar productos
  async searchProducts(query, searchBy = 'nombre') {
    const params = new URLSearchParams({
      q: query,
      by: searchBy,
    });
    return this.request(`/products/search?${params}`);
  }

  // Obtener productos con bajo stock
  async getLowStockProducts(threshold = 10) {
    return this.request(`/products/low-stock?threshold=${threshold}`);
  }

  // Obtener estadísticas del inventario
  async getStatistics() {
    return this.request('/statistics');
  }

  // Verificar estado de la API
  async healthCheck() {
    return this.request('/health');
  }
}

const apiService = new ApiService();
export default apiService;
