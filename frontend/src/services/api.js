import { API_BASE_URL } from '../config/api.js';

class ApiService {
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

  async getProducts() {
    return this.request('/products');
  }

  async getProduct(id) {
    return this.request(`/products/${id}`);
  }

  async createProduct(productData) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id, productData) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  async searchProducts(query, searchBy = 'nombre') {
    const params = new URLSearchParams({
      q: query,
      by: searchBy,
    });
    return this.request(`/products/search?${params}`);
  }

  async getLowStockProducts(threshold = 10) {
    return this.request(`/products/low-stock?threshold=${threshold}`);
  }

  async getStatistics() {
    return this.request('/statistics');
  }

  async healthCheck() {
    return this.request('/health');
  }
}

const apiService = new ApiService();
export default apiService;
