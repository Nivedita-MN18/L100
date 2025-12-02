from dataclasses import dataclass, asdict
from datetime import datetime
from typing import Optional

@dataclass
class URLItem:
    original_url: str
    short_code: str
    created_at: str
    clicks: int = 0
    alias: Optional[str] = None

    def to_dict(self):
        return asdict(self)

    @classmethod
    def from_dict(cls, data: dict):
        return cls(**data)
