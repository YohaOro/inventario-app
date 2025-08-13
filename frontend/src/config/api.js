// Configuración de la API para diferentes entornos
const config = {
  development: {
    apiUrl: '/api' // API Routes locales
  },
  production: {
    apiUrl: '/api' // API Routes en Vercel
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
