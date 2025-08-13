// Configuración de la API para diferentes entornos
const config = {
  development: {
    apiUrl: 'http://localhost:5001/api'
  },
  production: {
    apiUrl: 'https://tu-backend-vercel.vercel.app/api' // Cambiar por tu URL real
  }
};

// Determinar el entorno actual
const environment = process.env.NODE_ENV || 'development';

// URL de la API según el entorno
export const API_BASE_URL = config[environment].apiUrl;

// Configuración adicional
export const API_CONFIG = {
  timeout: 10000, // 10 segundos
  retryAttempts: 3,
  retryDelay: 1000 // 1 segundo
};

export default config[environment];
