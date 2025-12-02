# 🗺️ Advanced Roadmap & Scaling Strategy

This document outlines the path from MVP to a high-scale production system capable of handling millions of requests.

##  Phase 1: Persistence & Reliability (Next Steps)
- [ ] **Migrate to PostgreSQL**: Replace JSON file storage with a relational database for ACID compliance and concurrency.
- [ ] **Database Schema**:
  ```sql
  CREATE TABLE urls (
      id SERIAL PRIMARY KEY,
      short_code VARCHAR(10) UNIQUE NOT NULL,
      original_url TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      clicks INT DEFAULT 0
  );
  CREATE INDEX idx_short_code ON urls(short_code);
  ```

## Phase 2: Performance & Caching
- [ ] **Redis Caching**: Cache `short_code -> original_url` lookups to reduce DB load.
  - **Strategy**: Read-through cache with 24h TTL.
- [ ] **Async Writes**: Use a task queue (Celery/BullMQ) to increment click counters asynchronously, decoupling stats updates from redirect latency.

## Phase 3: Security & Control
- [ ] **Rate Limiting**: Implement per-IP token bucket algorithms (using Redis) to prevent abuse.
- [ ] **Malware Scanning**: Integrate with Google Safe Browsing API to check URLs before shortening.
- [ ] **User Accounts**: Add authentication (JWT) to allow users to manage their links.

## Phase 4: Infrastructure & DevOps
- [ ] **Dockerization**: Containerize Backend and Frontend.
- [ ] **CI/CD**: GitHub Actions pipeline for automated testing and deployment.
- [ ] **Monitoring**: Add Prometheus/Grafana for request latency and error rate tracking.

## Phase 5: Global Scale (Edge)
- [ ] **Edge Redirects**: Move redirect logic to Cloudflare Workers or AWS Lambda@Edge for <50ms global latency.
- [ ] **Geo-Sharding**: Distribute database replicas across regions.
