# 🃏 Pokemon Card Marketplace - Backend API

> **Production-ready FastAPI backend for Pokemon card trading with real-time eBay pricing and Stripe payments**

[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=flat&logo=postgresql)](https://postgresql.org/)
[![Stripe](https://img.shields.io/badge/Stripe-API-6772E5?style=flat&logo=stripe)](https://stripe.com/)
[![eBay](https://img.shields.io/badge/eBay-API-E53238?style=flat&logo=ebay)](https://developer.ebay.com/)

## 🌟 Overview

A comprehensive backend system for a Pokemon card marketplace featuring:
- **Real-time eBay price integration** with smart caching and rate limiting
- **Secure Stripe payment processing** with webhook handling
- **Advanced inventory management** with PostgreSQL database
- **Production-ready architecture** with monitoring and analytics
- **Dual environment support** (sandbox/production)

*For complete technical details, architecture diagrams, and implementation guides, see the full documentation files in this repository.*

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- PostgreSQL 15+
- Railway/cloud hosting account

### Environment Configuration
```bash
# Database Configuration
DATABASE_URL=postgresql://user:pass@host:5432/db

# eBay API Configuration (Production)
EBAY_ENVIRONMENT=production
EBAY_PROD_APP_ID=your_ebay_app_id
EBAY_PROD_CERT_ID=your_ebay_cert_id
EBAY_PROD_DEV_ID=your_ebay_dev_id
USE_REAL_EBAY_API=true

# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## 🏗️ Architecture

### System Components
- **FastAPI Backend** (main.py) - Core API server with 50+ endpoints
- **PostgreSQL Database** - Structured data with ACID compliance
- **eBay API Integration** - Real-time market pricing with fallbacks
- **Stripe Payment System** - Secure transaction processing
- **Caching Layer** - SQLite-based performance optimization
- **Rate Limiting** - Intelligent API quota management
- **Monitoring System** - Comprehensive usage analytics

### 📊 Database Schema
```sql
-- Core Tables
pokemon_cards     # Card inventory with pricing and availability
users            # Customer information and profiles
purchases        # Transaction records with Stripe data
purchase_items   # Individual cards in each transaction
price_history    # Historical pricing data for analytics
bookmarks        # User favorites and watchlist
```

## 📡 Key API Endpoints

### 🛒 Marketplace Operations
- `GET /api/available-cards` - Browse purchasable inventory
- `POST /api/complete-purchase` - Process card transactions
- `GET /api/purchase-history/{email}` - User transaction history

### 💰 Pricing & Market Data
- `GET /api/ebay-price` - Real-time card pricing from eBay
- `POST /api/refresh-prices` - Bulk price updates
- `GET /api/price-history` - Historical pricing trends

### 💳 Payment Processing (Stripe)
- `POST /api/create-payment-intent` - Single card purchase setup
- `POST /api/create-checkout-session` - Multi-card cart processing
- `POST /api/stripe-webhook` - Payment event handling

### 🔧 System Management
- `GET /api/ebay-status` - Integration health check
- `GET /api/cache-stats` - Performance metrics
- `GET /api/usage/stats` - API usage analytics

## 🔐 Security Features

- **CORS Configuration** - Multi-domain support
- **Stripe Webhook Verification** - Cryptographic validation
- **eBay OAuth 2.0** - Secure API token management
- **Input Validation** - Pydantic models throughout
- **Rate Limiting** - DDoS protection

## ⚡ Performance Optimization

- **SQLite Caching** with 1-hour TTL for eBay API responses
- **Rate Limiting** to stay within API quotas (4000 calls/day)
- **Database Indexing** optimized for common queries
- **Multi-tier Fallback** system for high availability

## 📈 Business Features

- **Real-time Market Pricing** from eBay marketplace data
- **Inventory Management** with automatic availability tracking
- **Transaction Processing** with comprehensive audit trails
- **Usage Analytics** for business intelligence
- **Seller/Buyer Management** with purchase history

## 🚀 Deployment

### Current Production Setup
- **Backend**: Railway deployment with PostgreSQL
- **Frontend**: Netlify deployment with Angular
- **APIs**: Live eBay and Stripe integration
- **Monitoring**: Built-in usage tracking and analytics

### Health Checks
- API health: `GET /api/health`
- Database: `GET /db-version`
- eBay API: `GET /api/ebay-status`
- Stripe: `GET /api/stripe-status`

---

**Built for PokéMarket - Professional Pokemon Card Marketplace**

*For detailed implementation guides, API documentation, and architecture diagrams, see the complete documentation in this repository.*