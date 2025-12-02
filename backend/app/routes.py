from flask import Blueprint, request, jsonify, redirect
from .services import URLShortenerService

bp = Blueprint('main', __name__)
service = URLShortenerService()

@bp.route('/api/shorten', methods=['POST'])
def shorten():
    data = request.get_json()
    if not data or 'url' not in data:
        return jsonify({'error': 'Missing URL'}), 400
    
    original_url = data['url']
    custom_alias = data.get('alias')
    
    try:
        url_item = service.shorten_url(original_url, custom_alias)
        return jsonify(url_item.to_dict()), 201
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

@bp.route('/<short_code>', methods=['GET'])
def redirect_to_url(short_code):
    original_url = service.get_original_url(short_code)
    if original_url:
        return redirect(original_url)
    return jsonify({'error': 'URL not found'}), 404

@bp.route('/api/stats/<short_code>', methods=['GET'])
def get_stats(short_code):
    url_item = service.get_url_stats(short_code)
    if url_item:
        return jsonify(url_item.to_dict())
    return jsonify({'error': 'URL not found'}), 404
