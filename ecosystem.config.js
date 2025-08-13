module.exports = {
  apps: [
    {
      name: 'inventario-backend',
      script: 'python3',
      args: 'api.py',
      cwd: './backend',
      env: {
        FLASK_APP: 'api.py',
        FLASK_ENV: 'development',
        FLASK_DEBUG: '1',
        PORT: 5001
      },
      watch: ['./backend'],
      ignore_watch: ['__pycache__', '*.pyc'],
      autorestart: true
    },
    {
      name: 'inventario-frontend',
      script: 'npm',
      args: 'start',
      cwd: './frontend',
      env: {
        PORT: 3000,
        CHOKIDAR_USEPOLLING: 'true'
      },
      watch: ['./frontend/src'],
      ignore_watch: ['node_modules', 'build'],
      autorestart: true
    }
  ]
};
