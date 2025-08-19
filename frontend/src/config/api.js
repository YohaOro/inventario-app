const config = {
  development: {
    apiUrl: 'http://localhost:5001/api'
  },
  production: {
    apiUrl: 'https://inventario-app-backend-4cnh.onrender.com/api'
  }
};

const environment = process.env.NODE_ENV || 'development';

export const API_BASE_URL = config[environment].apiUrl;

export default config[environment];
