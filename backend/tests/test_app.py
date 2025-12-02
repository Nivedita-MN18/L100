import pytest
import json
import os
from app import create_app
from app.utils import validate_url, validate_alias, generate_short_code

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    # Use a temporary file for testing
    app.config['DATA_FILE'] = 'test_urls.json'
    
    with app.test_client() as client:
        yield client
    
    # Cleanup
    if os.path.exists('test_urls.json'):
        os.remove('test_urls.json')

def test_utils_validation():
    assert validate_url("https://google.com") == True
    assert validate_url("ftp://example.org") == True
    assert validate_url("invalid-url") == False
    
    assert validate_alias("valid-alias") == True
    assert validate_alias("valid_alias_123") == True
    assert validate_alias("invalid alias") == False

def test_shorten_url(client):
    response = client.post('/api/shorten', json={
        'url': 'https://example.com'
    })
    assert response.status_code == 201
    data = response.get_json()
    assert 'short_code' in data
    assert data['original_url'] == 'https://example.com'

def test_shorten_custom_alias(client):
    response = client.post('/api/shorten', json={
        'url': 'https://example.com',
        'alias': 'custom-test'
    })
    assert response.status_code == 201
    data = response.get_json()
    assert data['short_code'] == 'custom-test'

def test_shorten_duplicate_alias(client):
    client.post('/api/shorten', json={
        'url': 'https://example.com',
        'alias': 'duplicate'
    })
    response = client.post('/api/shorten', json={
        'url': 'https://google.com',
        'alias': 'duplicate'
    })
    assert response.status_code == 400

def test_redirect(client):
    # Create a URL first
    res = client.post('/api/shorten', json={'url': 'https://example.com'})
    code = res.get_json()['short_code']
    
    # Test redirect
    response = client.get(f'/{code}')
    assert response.status_code == 302
    assert response.location == 'https://example.com'

def test_404(client):
    response = client.get('/nonexistent')
    assert response.status_code == 404
