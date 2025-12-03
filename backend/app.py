from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, port=5000)
# backend/app.py (near top)
import os, json
app = Flask(__name__)
# Example: load API keys from ENV or file; in production use DB/secret manager
keys = os.environ.get("SHORTENER_API_KEYS_JSON")
if keys:
    try:
        app.config["API_KEYS"] = json.loads(keys)
    except:
        app.config["API_KEYS"] = []
else:
    # fallback: look for a file
    keys_file = os.path.join(os.path.dirname(__file__), "api_keys.json")
    if os.path.exists(keys_file):
        with open(keys_file) as f:
            app.config["API_KEYS"] = json.load(f)
    else:
        app.config["API_KEYS"] = []
