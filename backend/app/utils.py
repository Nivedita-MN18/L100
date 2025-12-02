import string
import random
import re

BASE62 = string.ascii_letters + string.digits

def generate_short_code(length: int = 6) -> str:
    """Generate a random short code of given length."""
    return ''.join(random.choices(BASE62, k=length))

def validate_url(url: str) -> bool:
    """Validate if a string is a valid URL."""
    regex = re.compile(
        r'^(?:http|ftp)s?://' # http:// or https://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|' # domain...
        r'localhost|' # localhost...
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})' # ...or ip
        r'(?::\d+)?' # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
    return re.match(regex, url) is not None

def validate_alias(alias: str) -> bool:
    """Validate custom alias (alphanumeric, hyphens, underscores)."""
    return re.match(r'^[a-zA-Z0-9_-]+$', alias) is not None
