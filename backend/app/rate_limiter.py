# backend/rate_limiter.py
import time
from functools import wraps
from flask import request, jsonify

class TokenBucket:
    def __init__(self, rate=60, per=60):
        """
        rate: number of requests allowed
        per: per seconds window
        Example default: 60 req per 60 seconds (1 req/sec average)
        """
        self.rate = rate
        self.per = per
        self.allowance = {}
        self.timestamps = {}

    def allow(self, key):
        now = time.time()
        allowance = self.allowance.get(key, self.rate)
        last = self.timestamps.get(key, now)
        # refill
        elapsed = now - last
        allowance += elapsed * (self.rate / float(self.per))
        if allowance > self.rate:
            allowance = self.rate
        if allowance < 1.0:
            # deny
            self.allowance[key] = allowance
            self.timestamps[key] = now
            return False
        else:
            allowance -= 1.0
            self.allowance[key] = allowance
            self.timestamps[key] = now
            return True

# Global bucket instance (tweak rate/per as needed)
_bucket = TokenBucket(rate=30, per=60)  # 30 requests per minute per key/ip

def rate_limit(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        # prefer API key as identity else client IP
        key = request.headers.get("X-API-Key") or request.remote_addr or "anon"
        if not _bucket.allow(key):
            return jsonify({"error": "rate limit exceeded"}), 429
        return fn(*args, **kwargs)
    return wrapper
