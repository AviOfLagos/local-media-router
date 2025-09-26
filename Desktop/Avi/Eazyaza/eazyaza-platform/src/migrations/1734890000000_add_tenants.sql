-- Multi-tenancy implementation for EazyAza Platform
-- Based on Vercel Platforms patterns, adapted for Medusa e-commerce

-- Create tenants table
CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subdomain VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  logo_url TEXT,
  custom_domain VARCHAR(255) UNIQUE,

  -- Theme and branding configuration
  theme_config JSONB DEFAULT '{
    "primaryColor": "#000000",
    "secondaryColor": "#ffffff",
    "fontFamily": "Inter",
    "logoPosition": "left"
  }'::jsonb,

  -- Business configuration
  default_currency VARCHAR(3) DEFAULT 'USD',
  supported_regions TEXT[] DEFAULT ARRAY['us'],
  timezone VARCHAR(50) DEFAULT 'America/New_York',

  -- Payment provider configuration
  stripe_account_id VARCHAR(255),
  paystack_account_id VARCHAR(255),

  -- AI configuration for content generation
  ai_config JSONB DEFAULT '{
    "brandVoice": "professional",
    "industry": "general",
    "contentTone": "friendly"
  }'::jsonb,

  -- Status and metadata
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'pending')),
  subscription_tier VARCHAR(20) DEFAULT 'starter' CHECK (subscription_tier IN ('starter', 'professional', 'enterprise')),

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_tenants_subdomain ON tenants(subdomain);
CREATE INDEX IF NOT EXISTS idx_tenants_custom_domain ON tenants(custom_domain);
CREATE INDEX IF NOT EXISTS idx_tenants_status ON tenants(status);
CREATE INDEX IF NOT EXISTS idx_tenants_created_at ON tenants(created_at);

-- Add tenant_id to existing Medusa tables
-- Note: These may need adjustment based on actual Medusa v2 schema

-- Add tenant_id to store table
ALTER TABLE store ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);
CREATE INDEX IF NOT EXISTS idx_store_tenant_id ON store(tenant_id);

-- Add tenant_id to user table (if exists)
-- ALTER TABLE "user" ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);
-- CREATE INDEX IF NOT EXISTS idx_user_tenant_id ON "user"(tenant_id);

-- Create tenant_users junction table for multi-tenant user access
CREATE TABLE IF NOT EXISTS tenant_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL, -- References Medusa user table
  role VARCHAR(50) DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
  permissions JSONB DEFAULT '[]'::jsonb,
  invited_by UUID NULL,
  joined_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(tenant_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_tenant_users_tenant_id ON tenant_users(tenant_id);
CREATE INDEX IF NOT EXISTS idx_tenant_users_user_id ON tenant_users(user_id);

-- Create tenant_settings table for flexible configuration
CREATE TABLE IF NOT EXISTS tenant_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  setting_key VARCHAR(100) NOT NULL,
  setting_value JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(tenant_id, setting_key)
);

CREATE INDEX IF NOT EXISTS idx_tenant_settings_tenant_id ON tenant_settings(tenant_id);
CREATE INDEX IF NOT EXISTS idx_tenant_settings_key ON tenant_settings(setting_key);

-- Create audit log for tenant activities
CREATE TABLE IF NOT EXISTS tenant_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NULL, -- User who performed the action
  action VARCHAR(100) NOT NULL, -- e.g., 'product_created', 'order_placed'
  resource_type VARCHAR(50) NOT NULL, -- e.g., 'product', 'order'
  resource_id UUID NULL, -- ID of the affected resource
  metadata JSONB DEFAULT '{}'::jsonb,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_tenant_id ON tenant_audit_log(tenant_id);
CREATE INDEX IF NOT EXISTS idx_audit_created_at ON tenant_audit_log(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_action ON tenant_audit_log(action);

-- Insert default platform tenant (for our own management)
INSERT INTO tenants (
  subdomain,
  name,
  description,
  default_currency,
  supported_regions,
  subscription_tier,
  status
) VALUES (
  'platform',
  'EazyAza Platform',
  'Main platform management tenant',
  'USD',
  ARRAY['us', 'ca', 'gb', 'fr', 'ng'],
  'enterprise',
  'active'
) ON CONFLICT (subdomain) DO NOTHING;

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON tenants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tenant_users_updated_at BEFORE UPDATE ON tenant_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tenant_settings_updated_at BEFORE UPDATE ON tenant_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();