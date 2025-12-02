import json
import os
from typing import Dict, Optional
from flask import current_app
from .models import URLItem

DEFAULT_DATA_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'urls.json')

class StorageService:
    def __init__(self):
        pass

    def _get_file_path(self):
        try:
            return current_app.config.get('DATA_FILE', DEFAULT_DATA_FILE)
        except RuntimeError:
            return DEFAULT_DATA_FILE

    def _ensure_data_file(self):
        file_path = self._get_file_path()
        if not os.path.exists(file_path):
            with open(file_path, 'w') as f:
                json.dump({"urls": {}}, f)

    def _load_data(self) -> Dict:
        self._ensure_data_file()
        with open(self._get_file_path(), 'r') as f:
            return json.load(f)

    def _save_data(self, data: Dict):
        with open(self._get_file_path(), 'w') as f:
            json.dump(data, f, indent=2)

    def save_url(self, url_item: URLItem):
        data = self._load_data()
        data['urls'][url_item.short_code] = url_item.to_dict()
        self._save_data(data)

    def get_url(self, short_code: str) -> Optional[URLItem]:
        data = self._load_data()
        item_data = data['urls'].get(short_code)
        if item_data:
            return URLItem.from_dict(item_data)
        return None

    def update_clicks(self, short_code: str):
        data = self._load_data()
        if short_code in data['urls']:
            data['urls'][short_code]['clicks'] += 1
            self._save_data(data)

    def get_all_urls(self) -> Dict[str, URLItem]:
        data = self._load_data()
        return {k: URLItem.from_dict(v) for k, v in data['urls'].items()}

    def alias_exists(self, alias: str) -> bool:
        data = self._load_data()
        return alias in data['urls']
