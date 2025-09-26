# 🎉 EazyAza Platform - Multi-Tenant E-commerce SaaS

A production-ready multi-tenant e-commerce platform built with Medusa v2 and Next.js 15, featuring subdomain-based tenant routing and unlimited scalability.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm 8+
- PostgreSQL running locally
- Redis (optional for development)

### One-Command Startup
```bash
# Install dependencies and start both apps
npm run install:all
npm run dev
```

This will start:
- **Backend API**: http://localhost:9000
- **Admin Dashboard**: http://localhost:9000/app
- **Storefront**: http://localhost:8000

### Demo Tenant Stores
- **ACME Store**: http://acme-store.localhost:8000
- **Fashion Hub**: http://fashion-hub.localhost:8000
- **Naija Market**: http://naija-market.localhost:8000
- **Tech World**: http://tech-world.localhost:8000

## 📁 Project Structure

```
eazyaza-platform/                 # Monorepo root
├── package.json                  # Root package with workspace scripts
├── .env.shared                   # Shared environment variables
├── eazyaza-platform/            # Medusa backend
│   ├── src/
│   │   ├── lib/tenant.ts        # Tenant management service
│   │   ├── migrations/          # Database migrations (includes tenant schema)
│   │   └── scripts/             # Demo tenant creation script
│   └── package.json
├── eazyaza-platform-storefront/ # Next.js frontend
│   ├── src/
│   │   ├── middleware.ts        # Multi-tenant routing middleware
│   │   ├── lib/tenant-utils.ts  # Tenant utilities
│   │   └── app/store/[subdomain]/ # Dynamic tenant pages
│   └── package.json
├── PROJECT_STATUS.md            # Current implementation status
└── AWS_DEPLOYMENT_GUIDE.md      # Production deployment guide
```

## 🛠️ Available Scripts

### Development
```bash
npm run dev              # Start both apps with smart port detection
npm run dev:simple       # Start both apps concurrently (basic)
npm run dev:backend      # Start only Medusa backend
npm run dev:frontend     # Start only Next.js storefront
```

**Smart Port Detection**: The `npm run dev` command automatically detects port conflicts and uses alternative ports if needed (e.g., 9001, 8001) while clearly displaying the actual URLs being used.

### Production
```bash
npm run build           # Build both apps
npm run start           # Start both apps in production mode
```

### Database & Tenants
```bash
npm run db:migrate      # Run database migrations
npm run create-tenants  # Create demo tenants
```

### Maintenance
```bash
npm run install:all     # Install all dependencies
npm run clean          # Clean all node_modules and build files
npm run test           # Run tests for both apps
npm run lint           # Lint both apps
```

## 🏢 Multi-Tenancy Features

### ✅ Implemented
- **Subdomain-based routing** (tenant.domain.com)
- **Database-driven tenant storage** with audit logging
- **Tenant isolation and security boundaries**
- **Custom branding per tenant** (themes, colors, logos)
- **Multi-currency support** per tenant
- **Region-specific configurations**
- **AI-ready tenant configs** for future content generation

### 🛠️ Technical Implementation
- **Database Schema**: Complete tenant tables with PostgreSQL
- **Middleware**: Smart subdomain extraction and routing
- **Caching**: Tenant data caching with TTL
- **Fallback System**: Development-friendly tenant creation
- **Security**: Tenant data isolation and validation

## 🌍 Multi-Region Support

### Supported Regions & Currencies
1. **United States** - USD ($)
2. **Canada** - CAD (C$)
3. **United Kingdom** - GBP (£)
4. **Europe** - EUR (€) - France, Germany, Spain, Italy, Netherlands, Belgium
5. **Nigeria** - NGN (₦)

## 🔧 Configuration

### Environment Setup
1. Copy `.env.shared` to both app directories as `.env`
2. Update database and API credentials
3. Configure domain settings for production

### Database Configuration
- **Database**: `medusa-eazyaza-platform`
- **Host**: localhost:5432
- **User**: postgres

## 🚀 Deployment

### Development
Both apps run locally with hot reload and development features enabled.

### Production (AWS)
See `AWS_DEPLOYMENT_GUIDE.md` for complete deployment instructions including:
- ECS Fargate containers
- RDS PostgreSQL database
- ElastiCache Redis
- CloudFront CDN
- Route 53 DNS with wildcard subdomain support

**Estimated AWS Cost**: $126-271/month

## 💼 Business Model

### SaaS Pricing Tiers
- **Starter**: $99/month per tenant (basic features)
- **Professional**: $299/month (AI features + analytics)
- **Enterprise**: $999/month (custom features + support)

### Revenue Potential
- **Unlimited tenants** on single infrastructure
- **White-label capabilities** for enterprise clients
- **Global reach** with multi-currency/region support

## 🔐 Security Features

- **Tenant data isolation** with database-level security
- **Subdomain validation** and sanitization
- **Audit logging** for all tenant operations
- **Environment-based configuration** management
- **Production-ready** security boundaries

## 📈 Performance & Scaling

### Current Architecture
- **Horizontal scaling** ready with container orchestration
- **Database optimization** with tenant-specific indexes
- **Caching layer** for tenant data and configurations
- **CDN support** for global content delivery

### Monitoring
- **Health checks** for both applications
- **Performance metrics** collection ready
- **Error logging** and alerting configured

## 🤝 Contributing

### Development Workflow
1. Start development servers: `npm run dev`
2. Make changes to backend or frontend
3. Test multi-tenant functionality
4. Run tests: `npm run test`
5. Submit pull request

### Code Standards
- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for code formatting
- **Conventional commits** for version control

## 📞 Support

- **Documentation**: See `PROJECT_STATUS.md` for current status
- **Deployment**: See `AWS_DEPLOYMENT_GUIDE.md` for production setup
- **Issues**: Create GitHub issues for bugs or feature requests

---

## 🏆 Achievement Summary

✅ **Multi-tenancy implementation complete** - Production ready!
✅ **4 demo tenant stores** - Fully functional
✅ **Database architecture** - Enterprise grade
✅ **AWS deployment ready** - Scalable infrastructure
✅ **Developer experience** - One-command startup

**🎯 Ready for**: Customer onboarding, team collaboration, and production deployment!