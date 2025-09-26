// Tenant management utilities for EazyAza multi-tenancy
// Adapted from Vercel Platforms patterns for Medusa e-commerce

export interface Tenant {
  id: string;
  subdomain: string;
  name: string;
  description?: string;
  logo_url?: string;
  custom_domain?: string;
  theme_config: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    logoPosition: 'left' | 'center' | 'right';
  };
  default_currency: string;
  supported_regions: string[];
  timezone: string;
  stripe_account_id?: string;
  paystack_account_id?: string;
  ai_config: {
    brandVoice: string;
    industry: string;
    contentTone: string;
  };
  status: 'active' | 'suspended' | 'pending';
  subscription_tier: 'starter' | 'professional' | 'enterprise';
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface TenantUser {
  id: string;
  tenant_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  permissions: string[];
  joined_at: Date;
}

export interface CreateTenantRequest {
  subdomain: string;
  name: string;
  description?: string;
  owner_email: string;
  default_currency?: string;
  supported_regions?: string[];
  theme_config?: Partial<Tenant['theme_config']>;
  ai_config?: Partial<Tenant['ai_config']>;
}

export interface TenantContext {
  tenant: Tenant | null;
  user_role?: string;
  permissions?: string[];
}

// Database connection helper
export async function connectToDatabase() {
  // This will use Medusa's database connection
  // We'll integrate with Medusa's database service
  const { Client } = require('pg');

  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  await client.connect();
  return client;
}

// Tenant validation helpers
export function isValidSubdomain(subdomain: string): boolean {
  // Based on Vercel Platforms validation
  const sanitized = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
  return (
    sanitized === subdomain &&
    subdomain.length >= 2 &&
    subdomain.length <= 50 &&
    !subdomain.startsWith('-') &&
    !subdomain.endsWith('-') &&
    // Reserved subdomains
    !['www', 'api', 'admin', 'app', 'mail', 'ftp', 'localhost'].includes(subdomain)
  );
}

export function extractSubdomainFromHost(host: string, rootDomain: string): string | null {
  if (!host) return null;

  const hostname = host.split(':')[0];

  // Handle localhost development
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    if (hostname.includes('.localhost')) {
      const subdomain = hostname.split('.')[0];
      return subdomain !== 'localhost' ? subdomain : null;
    }
    return null;
  }

  // Handle production domains
  const rootDomainFormatted = rootDomain.split(':')[0];

  // Handle Vercel preview deployments (tenant---branch.vercel.app)
  if (hostname.includes('---') && hostname.endsWith('.vercel.app')) {
    const parts = hostname.split('---');
    return parts.length > 0 ? parts[0] : null;
  }

  // Regular subdomain detection
  const isSubdomain =
    hostname !== rootDomainFormatted &&
    hostname !== `www.${rootDomainFormatted}` &&
    hostname.endsWith(`.${rootDomainFormatted}`);

  return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, '') : null;
}

// Database operations
export class TenantService {
  private db: any;

  constructor(dbConnection: any) {
    this.db = dbConnection;
  }

  async getTenantBySubdomain(subdomain: string): Promise<Tenant | null> {
    if (!isValidSubdomain(subdomain)) {
      return null;
    }

    const query = `
      SELECT * FROM tenants
      WHERE subdomain = $1 AND status = 'active' AND deleted_at IS NULL
    `;

    const result = await this.db.query(query, [subdomain]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToTenant(result.rows[0]);
  }

  async getTenantById(id: string): Promise<Tenant | null> {
    const query = `
      SELECT * FROM tenants
      WHERE id = $1 AND status = 'active' AND deleted_at IS NULL
    `;

    const result = await this.db.query(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToTenant(result.rows[0]);
  }

  async createTenant(data: CreateTenantRequest): Promise<Tenant> {
    if (!isValidSubdomain(data.subdomain)) {
      throw new Error('Invalid subdomain format');
    }

    // Check if subdomain already exists
    const existing = await this.getTenantBySubdomain(data.subdomain);
    if (existing) {
      throw new Error('Subdomain already exists');
    }

    const query = `
      INSERT INTO tenants (
        subdomain, name, description, default_currency,
        supported_regions, theme_config, ai_config
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const values = [
      data.subdomain,
      data.name,
      data.description || null,
      data.default_currency || 'USD',
      data.supported_regions || ['us'],
      JSON.stringify(data.theme_config || {}),
      JSON.stringify(data.ai_config || {})
    ];

    const result = await this.db.query(query, values);
    return this.mapRowToTenant(result.rows[0]);
  }

  async getAllTenants(): Promise<Tenant[]> {
    const query = `
      SELECT * FROM tenants
      WHERE status = 'active' AND deleted_at IS NULL
      ORDER BY created_at DESC
    `;

    const result = await this.db.query(query);
    return result.rows.map((row: any) => this.mapRowToTenant(row));
  }

  async updateTenant(id: string, updates: Partial<Tenant>): Promise<Tenant | null> {
    const setClause = Object.keys(updates)
      .filter(key => updates[key as keyof Tenant] !== undefined)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');

    if (!setClause) {
      throw new Error('No valid updates provided');
    }

    const query = `
      UPDATE tenants
      SET ${setClause}, updated_at = NOW()
      WHERE id = $1 AND deleted_at IS NULL
      RETURNING *
    `;

    const values = [id, ...Object.values(updates).filter(v => v !== undefined)];
    const result = await this.db.query(query, values);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToTenant(result.rows[0]);
  }

  async deleteTenant(id: string): Promise<boolean> {
    const query = `
      UPDATE tenants
      SET deleted_at = NOW(), status = 'suspended'
      WHERE id = $1 AND deleted_at IS NULL
    `;

    const result = await this.db.query(query, [id]);
    return result.rowCount > 0;
  }

  private mapRowToTenant(row: any): Tenant {
    return {
      id: row.id,
      subdomain: row.subdomain,
      name: row.name,
      description: row.description,
      logo_url: row.logo_url,
      custom_domain: row.custom_domain,
      theme_config: row.theme_config || {
        primaryColor: '#000000',
        secondaryColor: '#ffffff',
        fontFamily: 'Inter',
        logoPosition: 'left'
      },
      default_currency: row.default_currency,
      supported_regions: row.supported_regions,
      timezone: row.timezone,
      stripe_account_id: row.stripe_account_id,
      paystack_account_id: row.paystack_account_id,
      ai_config: row.ai_config || {
        brandVoice: 'professional',
        industry: 'general',
        contentTone: 'friendly'
      },
      status: row.status,
      subscription_tier: row.subscription_tier,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
      deleted_at: row.deleted_at ? new Date(row.deleted_at) : undefined
    };
  }

  async getUserTenants(userId: string): Promise<TenantUser[]> {
    const query = `
      SELECT tu.*, t.name as tenant_name, t.subdomain
      FROM tenant_users tu
      JOIN tenants t ON tu.tenant_id = t.id
      WHERE tu.user_id = $1 AND t.status = 'active' AND t.deleted_at IS NULL
    `;

    const result = await this.db.query(query, [userId]);
    return result.rows.map((row: any) => ({
      id: row.id,
      tenant_id: row.tenant_id,
      user_id: row.user_id,
      role: row.role,
      permissions: row.permissions || [],
      joined_at: new Date(row.joined_at),
      tenant_name: row.tenant_name,
      tenant_subdomain: row.subdomain
    }));
  }

  async addUserToTenant(tenantId: string, userId: string, role: string = 'member'): Promise<TenantUser> {
    const query = `
      INSERT INTO tenant_users (tenant_id, user_id, role)
      VALUES ($1, $2, $3)
      ON CONFLICT (tenant_id, user_id)
      DO UPDATE SET role = $3, updated_at = NOW()
      RETURNING *
    `;

    const result = await this.db.query(query, [tenantId, userId, role]);
    return result.rows[0];
  }
}

// Export singleton instance factory
export async function createTenantService(): Promise<TenantService> {
  const db = await connectToDatabase();
  return new TenantService(db);
}