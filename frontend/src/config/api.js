// Configuración de la API para diferentes entornos
const config = {
  development: {
    apiUrl: 'http://localhost:5001/api' // Backend Flask local
  },
  production: {
    apiUrl: 'https://inventario-app-backend.onrender.com/api' // Backend Flask en Render
  }
};

// Determinar el entorno actual
const environment = process.env.NODE_ENV || 'development';

// URL de la API según el entorno
export const API_BASE_URL = config[environment].apiUrl;


export default config[environment];
