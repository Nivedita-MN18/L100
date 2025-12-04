from datetime import datetime, timezone

import app
from .storage import StorageService
from .models import URLItem
from .utils import generate_short_code, validate_url, validate_alias
from auth import require_api_key

storage = StorageService()
@app.route("/api/shorten", methods=["POST"])
@require_api_key

class URLShortenerService:
    def shorten_url(self, original_url: str, custom_alias: str = None) -> URLItem:
        if not validate_url(original_url):
            raise ValueError("Invalid URL format")

        if custom_alias:
            if not validate_alias(custom_alias):
                raise ValueError("Invalid alias format")
            if storage.alias_exists(custom_alias):
                raise ValueError("Alias already exists")
            short_code = custom_alias
        else:
            short_code = generate_short_code()
            while storage.get_url(short_code):
                short_code = generate_short_code()

        url_item = URLItem(
            original_url=original_url,
            short_code=short_code,
            created_at=datetime.now(timezone.utc).isoformat(),
            alias=custom_alias
        )
        storage.save_url(url_item)
        return url_item

    def get_original_url(self, short_code: str) -> str:
        url_item = storage.get_url(short_code)
        if url_item:
            storage.update_clicks(short_code)
            return url_item.original_url
        return None

    def get_url_stats(self, short_code: str) -> URLItem:
        return storage.get_url(short_code)
