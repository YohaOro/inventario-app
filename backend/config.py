import os

class Config:
    """Configuración base"""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    DATABASE = os.path.join(os.path.dirname(__file__), '..', 'inventario.db')
    
class DevelopmentConfig(Config):
    """Configuración para desarrollo"""
    DEBUG = True
    TESTING = False
    # Optimizaciones para desarrollo rápido
    TEMPLATES_AUTO_RELOAD = True
    SEND_FILE_MAX_AGE_DEFAULT = 0
    
class ProductionConfig(Config):
    """Configuración para producción"""
    DEBUG = False
    TESTING = False
    
class TestingConfig(Config):
    """Configuración para testing"""
    TESTING = True
    DEBUG = True

# Configuración por defecto
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}
