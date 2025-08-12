#!/usr/bin/env python3
"""
Configuración para servir archivos estáticos (imágenes, iconos, etc.)
desde el backend Flask
"""

import os
from flask import send_from_directory, current_app

def configure_assets(app):
    """Configura las rutas para servir archivos estáticos"""
    
    # Ruta base para assets
    ASSETS_PATH = os.path.join(os.path.dirname(__file__), '..', 'assets')
    
    @app.route('/assets/<path:filename>')
    def serve_asset(filename):
        """Sirve archivos estáticos desde la carpeta assets"""
        try:
            return send_from_directory(ASSETS_PATH, filename)
        except FileNotFoundError:
            return {'error': 'Asset no encontrado'}, 404
    
    @app.route('/assets/icons/<path:filename>')
    def serve_icon(filename):
        """Sirve iconos específicamente"""
        try:
            return send_from_directory(os.path.join(ASSETS_PATH, 'icons'), filename)
        except FileNotFoundError:
            return {'error': 'Icono no encontrado'}, 404
    
    @app.route('/assets/images/<path:filename>')
    def serve_image(filename):
        """Sirve imágenes específicamente"""
        try:
            return send_from_directory(os.path.join(ASSETS_PATH, 'images'), filename)
        except FileNotFoundError:
            return {'error': 'Imagen no encontrada'}, 404
    
    # Configurar headers para cache de assets
    @app.after_request
    def add_cache_headers(response):
        if '/assets/' in request.path:
            # Cache por 1 hora para assets
            response.cache_control.max_age = 3600
            response.cache_control.public = True
        return response
    
    print(f"✅ Assets configurados desde: {ASSETS_PATH}")
    return app
