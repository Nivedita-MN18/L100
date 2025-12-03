# backend/auth.py
from functools import wraps
from flask import request, jsonify, current_app

def require_api_key(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        # Accept API key in X-API-Key header or ?api_key=...
        key = request.headers.get("X-API-Key") or request.args.get("api_key")
        if not key:
            return jsonify({"error": "api key required"}), 401
        allowed = current_app.config.get("API_KEYS", [])
        if key not in allowed:
            return jsonify({"error": "invalid api key"}), 403
        return fn(*args, **kwargs)
    return wrapper
