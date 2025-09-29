
# Eazyaza Multi-Tenant E-Commerce Platform - User Flow & Information Architecture

**Built with Medusa.js Framework**

## 1. Platform Architecture Overview

### Core Components

* **Main Platform (Hub)** : Discovery, registration, directory management
* **Individual Storefronts** : Isolated shopping experiences with separate carts
* **Unified Authentication System** : Single sign-on across all stores (using Medusa Auth Module)
* **Entry Point Tracking** : Analytics for user acquisition sources
* **Medusa Commerce Modules** : Product, Cart, Customer, Order, Payment modules

### User Types

1. **Guest Users** (Non-authenticated visitors)
2. **Shoppers** (Registered buyers)
3. **Store Owners** (Vendors/Merchants)
4. **Super Admin** (Platform administrators)

---

## 2. Database Architecture (Medusa-Based)

### Medusa Core Tables (Shared)

* `user` (Medusa Auth Module)
* `auth_identity`
* `store` (Vendor/Store data)
* `api_key`
* `workflow_execution`

### Custom Tables (Marketplace Extension)

* `entry_points` (tracking user sources)
* `vendor_admins` (store owner accounts)
* `vendor_analytics`
* `platform_categories`

### Store-Scoped Tables (Medusa Modules)

* `product` (scoped by store_id)
* `product_variant`
* `order` (scoped by store_id)
* `cart` (isolated per store)
* `customer` (can access multiple stores)
* `payment_collection`
* `fulfillment`
* `inventory_item`

### Medusa Module Links

* Link<Store, Product>
* Link<Store, Order>
* Link<Vendor, User>
* Link<Customer, Store>

---

## 3. Detailed User Flows

### 3.1 Guest User Flow

#### Discovery Flow

```
1. Land on Main Platform Homepage
   ↓
2. View Store Directory
   - Browse by category
   - Search stores by name/product type
   - View featured stores
   ↓
3. Click on Store Card
   ↓
4. Redirect to Store URL (subdomain or path)
   - Example: store-name.platform.com or platform.com/stores/store-name
   ↓
5. Browse Store as Guest
   - View products
   - Read reviews
   - Check store policies
   ↓
6. Attempt Purchase → Prompt Registration/Login
```

#### Registration Decision Point

```
Guest has two options:
A. Register through current store
   → Entry point: store_{id}
   
B. Return to main platform to register
   → Entry point: main_platform
```

---

### 3.2 Shopper User Flow

#### Registration Flow (Main Platform)

```
1. Click "Sign Up as Shopper"
   ↓
2. Registration Form
   - Email (unique across platform)
   - Password
   - Full Name
   - Phone (optional)
   - Delivery Address (can add later)
   ↓
3. Email Verification
   ↓
4. Profile Completion (optional)
   - Avatar
   - Preferences
   - Saved addresses
   ↓
5. Entry Point Logged: "main_platform"
   ↓
6. Redirect to Store Directory
```

#### Shopping Flow

```
1. Login (if not authenticated)
   ↓
2. Browse Main Platform
   - Search stores
   - Filter by category
   - View recommendations
   - View Featured stores
   ↓
3. Select Store
   ↓
4. Auto-authenticate in Store (SSO)
   - User data passed via secure token
   - No re-login required
   ↓
5. Shop Within Store
   - Browse products
   - Add to store-specific cart
   - View store-specific order history
   ↓
6. Checkout Process
   - Store-specific payment processing
   - Store-specific shipping options
   - Store handles fulfillment
   ↓
7. Order Confirmation
   - Email from store
   - Copy to platform for tracking
```

#### Multi-Store Shopping

```
Store A Shopping:
1. Add items to Store A cart
2. Complete Store A checkout
3. Receive Store A order

Store B Shopping (parallel):
1. Add items to Store B cart
2. Complete Store B checkout
3. Receive Store B order

Note: Carts are completely independent
```

#### Account Management

```
From Main Platform:
- View all store memberships
- Update profile information
- View activity across stores
- Manage security settings

From Individual Store:
- View store-specific orders
- Save store-specific favorites
- Manage store-specific addresses
```

---

### 3.3 Store Owner Flow (Medusa Implementation)

#### Registration Flow - Simplified

```
1. Click "Open Your Store"
   ↓
2. Store Owner Registration (Using Medusa Auth Module)
   - Email (unique across platform)
   - Store Name (unique, auto-generates subdomain)
   - Password
   ↓
3. OTP Verification
   Option A: Email OTP
   - Send 6-digit code
   - Verify within 10 minutes
   
   Option B: Use Medusa's existing auth flow
   - JWT token verification
   - Click verification link in email
   ↓
4. Account Created
   - Entry point: "main_platform"
   - Auto-login to dashboard
   ↓
5. Setup Wizard Launch
```

#### Setup Wizard - Reordered Flow

```
Step 1: Add Products (Priority)
├── Option A: Instagram Import
│   ├── Enter Instagram username
│   ├── use crawl script methods in /Users/MAC/Desktop/Avi/Eazyaza/Instagram-image-fetch
│   ├── Fetch posts with shopping tags if possible
│   ├── Display grid of potential products
│   │   - Image preview
│   │   - Caption as description
│   │   - Hashtags as tags
│   ├── Bulk select products
│   └── Auto-populate product fields
│
├── Option B: Bulk Import (Medusa Import Module)
│   ├── Upload CSV/Excel file
│   ├── Map columns to Medusa Product schema
│   └── Validate and import
│
├── Option C: Manual Addition (Medusa Product Module)
│   ├── Product title
│   ├── Description
│   ├── Images (multiple)
│   ├── Price & inventory
│   └── Categories/tags
│
└── Option D: Skip for Now
    └── Redirect to Step 2

Step 2: Store Configuration
├── Store URL Confirmation
│   - Display: "{store-name}.eazyaza.com"
│   - Option to modify (check availability)
│   - Note: Store name remains unchanged
│
├── Store Category (Medusa Category Module)
│   - Fashion & Apparel
│   - Electronics
│   - Home & Living
│   - Beauty & Health
│   - Food & Beverages
│   - Other (specify)
│
└── Store Description
    - Brief description (140 chars)
    - Full description (optional)

Step 3: Branding 
├── Logo Setup
│   ├── Option A: Upload Logo
│   │   - Accepted: PNG, JPG, SVG
│   │   - Auto-resize for different contexts
│   │
│   └── Option B: Text Logo
│       - Use store name as text
│       - Select font style
│
├── Theme Selection (Medusa Admin UI Extensions)
│   - Minimal
│   - Modern
│   - Classic
│   - Bold
│
└── Color Scheme
    - Primary color
    - Secondary color
    - Auto-generate complementary colors

Step 4: Complete Setup
├── Review Summary
├── "Set Up Payment Later" reminder
└── Enter Admin Dashboard
```

#### Admin Dashboard (Medusa Admin Customization)

```
Dashboard Home (Using Medusa Admin Widgets)
├── Quick Actions Panel
│   ├── Add Payment Method (prompt)
│   ├── Complete Store Profile
│   ├── Add More Products
│   └── View Storefront
│
├── Analytics Overview (Medusa Analytics Module)
│   - Sales metrics
│   - Visitor analytics
│   - Conversion rates
│   - Product performance
│
├── Product Management (Medusa Product Module)
│   ├── Products List (DataGrid)
│   ├── Add Product
│   │   ├── Instagram Import
│   │   ├── Manual Entry
│   │   └── Bulk Import
│   ├── Edit Products
│   ├── Inventory Tracking
│   └── Product Categories
│
├── Order Management (Medusa Order Module)
│   ├── Order List (filterable)
│   ├── Order Details
│   ├── Fulfillment Status
│   └── Shipping Labels
│
├── Customer Management (Medusa Customer Module)
│   ├── Customer List
│   ├── Customer Groups
│   └── Customer Communication
│
├── Store Settings
│   ├── General Settings
│   ├── Payment Methods (Medusa Payment Module)
│   │   - Stripe Connect integration
│   │   - PayPal
│   │   - Bank Transfer
│   ├── Shipping Zones (Medusa Fulfillment Module)
│   ├── Tax Configuration (Medusa Tax Module)
│   └── Email Templates
│
└── Marketing Tools (Medusa Promotion Module)
    ├── Discounts/Coupons
    ├── Campaigns
    └── SEO Settings
```

#### Instagram Product Import Flow

```
1. Store Owner clicks "Import from Instagram"
   ↓
2. modify script from here: /Users/MAC/Desktop/Avi/Eazyaza/Instagram-image-fetch 
   ↓
3. Fetch Instagram Content
   - Filter posts with product tags
   - Retrieve last 10 posts
   ↓
4. Product Selection Interface
   ├── Grid View Display
   │   - Post image
   │   - Caption preview
   │   - Engagement metrics
   │   - Product tag indicators
   │
   ├── Bulk Selection Tools
   │   - Select all
   │   - Filter by date
   │   - Filter by hashtag
   │
   └── Import Preview
       - Show mapped fields
       - Allow field editing
       - Set default values
   ↓
5. Import to Medusa Product Module
   - Create Product entities
   - Map Instagram data:
     * Image → Product Images
     * Caption → Description
     * Hashtags → Tags
     * Tagged products → Variants
   - Set placeholder prices
   - Mark for price review
   ↓
6. Post-Import Actions
   - Review imported products
   - Edit prices/inventory
   - Publish to storefront
```

#### Medusa Components & Modules Used

```
Backend Modules:
- @medusajs/medusa Product Module
- @medusajs/medusa Customer Module  
- @medusajs/medusa Order Module
- @medusajs/medusa Cart Module
- @medusajs/medusa Payment Module
- @medusajs/medusa Auth Module
- @medusajs/medusa Store Module
- @medusajs/medusa Tax Module
- @medusajs/medusa Fulfillment Module

Admin Extensions:
- Admin UI Routes (custom pages)
- Admin Widgets (dashboard cards)
- Admin UI Extensions (theme customization)

Marketplace Plugin:
- @techlabi/medusa-marketplace-plugin (for multi-vendor support)
- Custom vendor management
- Store isolation
- Super admin features

API Extensions:
- Custom API routes for Instagram import
- Webhook handlers for entry point tracking
- Custom workflows for vendor onboarding
```

---

### 3.4 Super Admin Flow

#### Platform Management Dashboard

```
Super Admin Dashboard
├── Platform Analytics
│   ├── Total GMV
│   ├── Active stores
│   ├── Total users
│   ├── Platform growth metrics
│   └── Entry point analytics
│
├── Store Management
│   ├── Pending Approvals
│   ├── Active Stores
│   │   - View store details
│   │   - Access store metrics
│   │   - Suspend/activate
│   │
│   ├── Store Violations
│   │   - Review complaints
│   │   - Content moderation
│   │   - Policy enforcement
│   │
│   └── Store Communications
│
├── User Management
│   ├── User Search
│   ├── User Details
│   ├── Account Actions
│   └── Bulk Operations
│
├── Product Moderation
│   ├── Flagged Products
│   ├── Reported Items
│   ├── Category Management
│   └── Prohibited Items
│
├── Platform Configuration
│   ├── General Settings
│   ├── Category Management
│   ├── Commission Settings
│   ├── Feature Flags
│   └── API Configuration
│
├── Financial Management
│   ├── Transaction Overview
│   ├── Payout Management
│   ├── Commission Reports
│   └── Dispute Resolution
│
└── Support Center
    ├── Support Tickets
    ├── Knowledge Base
    └── System Announcements
```

---

## 4. Technical Implementation Flow

### 4.1 Authentication & SSO Flow

```
1. User logs in to main platform
   ↓
2. Generate JWT token with:
   - User ID
   - Email
   - Role
   - Permissions
   - Expiry
   ↓
3. Store token in:
   - HttpOnly cookie (web)
   - Secure storage (mobile)
   ↓
4. When accessing store:
   - Validate token
   - Create store-specific session
   - No re-authentication needed
```

### 4.2 Entry Point Tracking

```
Registration Source Detection:
1. Check referrer URL
2. Identify source:
   - main_platform
   - store_{id}
   - external_{source}
3. Store in database:
   - user_id
   - entry_point
   - timestamp
   - utm_parameters
```

### 4.3 Cart Isolation Pattern

```
Each store maintains separate cart:
- store1.com/cart → Store 1 Cart
- store2.com/cart → Store 2 Cart
- No cart aggregation
- No cross-store checkout
```

---

## 5. URL Structure (Eazyaza Platform)

### Main Platform URLs

* `eazyaza.com` - Homepage/Store directory
* `eazyaza.com/stores` - All stores listing
* `eazyaza.com/stores/category/{category}` - Category filtering
* `eazyaza.com/register` - User registration
* `eazyaza.com/login` - User login (Medusa Auth)
* `eazyaza.com/dashboard` - User dashboard
* `eazyaza.com/become-a-seller` - Store owner onboarding

### Store URLs (Subdomain)

* `{store-name}.eazyaza.com` - Store homepage
* `{store-name}.eazyaza.com/products` - All products
* `{store-name}.eazyaza.com/product/{id}` - Product detail
* `{store-name}.eazyaza.com/cart` - Store cart (isolated)
* `{store-name}.eazyaza.com/checkout` - Store checkout
* `{store-name}.eazyaza.com/orders` - Order history

### Store Admin URLs (Medusa Admin)

* `{store-name}.eazyaza.com/admin` - Admin dashboard
* `{store-name}.eazyaza.com/admin/products` - Product management
* `{store-name}.eazyaza.com/admin/orders` - Order management
* `{store-name}.eazyaza.com/admin/settings` - Store settings
* `{store-name}.eazyaza.com/admin/instagram-import` - Instagram import tool

### Super Admin URLs

* `eazyaza.com/super-admin` - Super admin dashboard
* `eazyaza.com/super-admin/stores` - Store management
* `eazyaza.com/super-admin/users` - User management
* `eazyaza.com/super-admin/moderation` - Content moderation

---

## 6. Key Features by User Type

### For Shoppers

* Single account for all stores
* Store-specific wishlists
* Store-specific order history
* Unified notification center
* Cross-store search from main platform

### For Store Owners

* Complete store autonomy
* Custom domain mapping (optional)
* Built-in analytics
* Customer relationship management
* Inventory management
* Multi-channel integration capability

### For Super Admin

* Platform-wide analytics
* Revenue tracking
* Compliance monitoring
* Batch operations
* Platform health monitoring
* Entry point analytics

---

## 7. Security & Privacy Considerations

### Data Isolation

* Store data completely isolated
* No cross-store data access
* Store owners can't see other stores' data

### Permission Matrix

```
              | Own Profile | Own Store | Other Stores | Platform |
Shopper       | Full        | Read/Buy  | Read/Buy     | Read     |
Store Owner   | Full        | Full      | Read/Buy     | Read     |
Super Admin   | Full        | Full      | Full         | Full     |
```

### Compliance Requirements

* GDPR compliance for user data
* PCI compliance for payment processing
* Store-level data retention policies
* User data portability

---

## 8. Edge Cases & Special Flows

### Store Owner as Shopper

* Store owners can shop at other stores
* Same SSO benefits
* Separate buyer/seller dashboards

### Store Migration

* Store owner wants to leave platform
* Export all store data
* Customer notification process
* Redirect handling

### Dispute Resolution

```
1. Customer files complaint
2. Store receives notification
3. Store responds
4. If unresolved → Escalate to Super Admin
5. Super Admin mediates
6. Resolution logged
```

### Account Deletion

* User requests deletion
* Notify all associated stores
* Archive transaction history (legal requirement)
* Remove personal data
* Maintain anonymized analytics

---

## 9. Analytics & Tracking

### Platform Metrics

* Total users by type
* Store performance rankings
* Category popularity
* Entry point effectiveness
* User journey analytics

### Store Metrics

* Traffic sources
* Conversion rates
* Average order value
* Customer lifetime value
* Product performance

### Entry Point Analytics

```
Track and analyze:
- Registration source distribution
- Source-to-purchase conversion
- Customer lifetime value by source
- Store discovery patterns
```

---

## 10. Implementation Priority (Medusa-Based)

### Phase 1 - MVP (Month 1)

1. **Medusa Core Setup**
   * Install Medusa v2.0 with marketplace plugin
   * Configure PostgreSQL database
   * Set up Redis for caching
   * Deploy Admin dashboard
2. **Store Owner Onboarding**
   * Simplified registration flow
   * OTP verification system
   * Basic setup wizard
   * Instagram import MVP
3. **Essential Commerce**
   * Product Module configuration
   * Cart isolation per store
   * Basic checkout with Medusa workflows
   * Order management

### Phase 2 - Enhancement (Month 2)

1. **Advanced Features**
   * Full Instagram product import
   * Bulk import via CSV/Excel
   * Payment integration (Stripe Connect)
   * Entry point tracking implementation
2. **Store Customization**
   * Theme system implementation
   * Storefront builder with Medusa UI
   * Custom domain mapping
   * Email notification templates

### Phase 3 - Scale (Month 3)

1. **Platform Features**
   * Super Admin dashboard (using marketplace plugin)
   * Advanced analytics with Medusa Analytics Module
   * Multi-language support
   * Mobile-responsive admin
2. **Integrations**
   * Third-party logistics providers
   * Marketing automation
   * Customer support system
   * Advanced moderation tools

---

## 11. Testing Scenarios

### Critical User Journeys to Test

1. **New shopper registration → First purchase**
2. **Store owner onboarding → First sale**
3. **Multi-store shopping session**
4. **SSO across different stores**
5. **Super admin content moderation**
6. **Entry point tracking accuracy**
7. **Cart isolation between stores**
8. **Order fulfillment process**

### Load Testing Scenarios

* 1000+ concurrent shoppers
* 100+ stores processing orders simultaneously
* Large catalog stores (10,000+ products)
* High-traffic sale events

---

## 13. Medusa Configuration & Setup

### Package Installation

```bash
# Create new Medusa project
npx create-medusa-app@latest eazyaza-marketplace

# Install marketplace plugin
npm install @techlabi/medusa-marketplace-plugin

# Additional dependencies for Instagram integration
npm install instagram-basic-display
npm install @medusajs/file-s3  # For image storage
```

### medusa-config.ts Configuration

```typescript
module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      cors: process.env.STORE_CORS || "*",
    },
  },
  admin: {
    vite: () => ({
      optimizeDeps: {
        include: ["qs"],
      },
    }),
  },
  plugins: [
    {
      resolve: "@techlabi/medusa-marketplace-plugin",
      options: {
        enableSuperAdmin: true,
        storeIsolation: true,
        customDomain: true,
      },
    },
    {
      resolve: "@medusajs/file-s3",
      options: {
        s3_url: process.env.S3_URL,
        bucket: process.env.S3_BUCKET,
        region: process.env.S3_REGION,
        access_key_id: process.env.S3_ACCESS_KEY,
        secret_access_key: process.env.S3_SECRET_KEY,
      },
    },
  ],
  modules: {
    // Multi-vendor support
    storeService: {
      resolve: "./src/modules/store",
    },
    // Instagram integration
    instagramService: {
      resolve: "./src/modules/instagram",
    },
    // Entry point tracking
    analyticsService: {
      resolve: "./src/modules/analytics",
    },
  },
})
```

### Custom Workflows (src/workflows)

```typescript
// store-onboarding.workflow.ts
export const storeOnboardingWorkflow = createWorkflow(
  "store-onboarding",
  (input: StoreOnboardingInput) => {
    // Step 1: Create vendor account
    const vendor = createVendorStep(input)
  
    // Step 2: Setup store configuration
    const store = setupStoreStep(vendor)
  
    // Step 3: Send welcome email
    sendWelcomeEmailStep(vendor, store)
  
    // Step 4: Track entry point
    trackEntryPointStep(vendor, input.entryPoint)
  
    return { vendor, store }
  }
)

// instagram-import.workflow.ts
export const instagramImportWorkflow = createWorkflow(
  "instagram-import",
  async (input: InstagramImportInput) => {
    // Step 1: Authenticate Instagram
    const auth = await authenticateInstagramStep(input.accessToken)
  
    // Step 2: Fetch posts
    const posts = await fetchInstagramPostsStep(auth)
  
    // Step 3: Process and create products
    const products = await createProductsFromPostsStep(posts, input.storeId)
  
    return { products }
  }
)
```

### API Routes (src/api)

```typescript
// Store owner registration endpoint
POST /store/register
{
  email: string
  storeName: string  
  password: string
}

// OTP verification
POST /store/verify-otp
{
  email: string
  otp: string
}

// Instagram import
POST /store/:id/import/instagram
{
  accessToken: string
  selectedPosts: string[]
}

// Entry point tracking
POST /analytics/entry-point
{
  userId: string
  source: string
  timestamp: Date
}
```

## 14. Success Metrics

### Platform KPIs

* Monthly active users (MAU)
* Gross merchandise value (GMV)
* Number of active stores
* Average stores per shopper
* Platform-wide conversion rate

### Store KPIs

* Store-specific conversion rate
* Average order value
* Customer retention rate
* Product listing quality score

### User Experience KPIs

* Time to first purchase
* Cross-store shopping rate
* User satisfaction score
* Support ticket volume
* Cart abandonment rate
