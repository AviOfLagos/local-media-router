import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { createTenantService } from "../lib/tenant";

export default async function createDemoTenants({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

  logger.info("🏪 Creating demo tenants for testing multi-tenancy...");

  try {
    const tenantService = await createTenantService();

    const demoTenants = [
      {
        subdomain: 'acme-store',
        name: 'ACME Store',
        description: 'Premium gadgets and electronics for the modern lifestyle',
        owner_email: 'admin@acme-store.com',
        default_currency: 'USD',
        supported_regions: ['us', 'ca'],
        theme_config: {
          primaryColor: '#1f2937',
          secondaryColor: '#f3f4f6',
          fontFamily: 'Inter',
          logoPosition: 'left' as const
        },
        ai_config: {
          brandVoice: 'professional',
          industry: 'electronics',
          contentTone: 'informative'
        }
      },
      {
        subdomain: 'fashion-hub',
        name: 'Fashion Hub',
        description: 'Trendy fashion and accessories for every occasion',
        owner_email: 'admin@fashion-hub.com',
        default_currency: 'EUR',
        supported_regions: ['gb', 'fr', 'de'],
        theme_config: {
          primaryColor: '#ec4899',
          secondaryColor: '#fdf2f8',
          fontFamily: 'Inter',
          logoPosition: 'center' as const
        },
        ai_config: {
          brandVoice: 'trendy',
          industry: 'fashion',
          contentTone: 'inspiring'
        }
      },
      {
        subdomain: 'naija-market',
        name: 'Naija Market',
        description: 'Authentic Nigerian products and local crafts',
        owner_email: 'admin@naija-market.com',
        default_currency: 'NGN',
        supported_regions: ['ng'],
        theme_config: {
          primaryColor: '#10b981',
          secondaryColor: '#f0fdf4',
          fontFamily: 'Inter',
          logoPosition: 'left' as const
        },
        ai_config: {
          brandVoice: 'cultural',
          industry: 'local-crafts',
          contentTone: 'proud'
        }
      },
      {
        subdomain: 'tech-world',
        name: 'Tech World',
        description: 'Latest technology and software solutions',
        owner_email: 'admin@tech-world.com',
        default_currency: 'CAD',
        supported_regions: ['ca', 'us'],
        theme_config: {
          primaryColor: '#3b82f6',
          secondaryColor: '#eff6ff',
          fontFamily: 'Inter',
          logoPosition: 'left' as const
        },
        ai_config: {
          brandVoice: 'technical',
          industry: 'technology',
          contentTone: 'expert'
        }
      }
    ];

    for (const tenantData of demoTenants) {
      try {
        // Check if tenant already exists
        const existing = await tenantService.getTenantBySubdomain(tenantData.subdomain);

        if (existing) {
          logger.info(`✓ Tenant ${tenantData.subdomain} already exists, skipping...`);
          continue;
        }

        const tenant = await tenantService.createTenant(tenantData);
        logger.info(`✅ Created tenant: ${tenant.name} (${tenant.subdomain})`);

        // Log access URL
        logger.info(`   → Store URL: http://${tenant.subdomain}.localhost:8000`);

      } catch (error: any) {
        logger.error(`❌ Failed to create tenant ${tenantData.subdomain}:`, error.message);
      }
    }

    logger.info("\n🎉 Demo tenant creation completed!");
    logger.info("\n📋 Test your multi-tenant setup:");
    logger.info("   • http://acme-store.localhost:8000");
    logger.info("   • http://fashion-hub.localhost:8000");
    logger.info("   • http://naija-market.localhost:8000");
    logger.info("   • http://tech-world.localhost:8000");
    logger.info("   • Main platform: http://localhost:8000");
    logger.info("   • Admin dashboard: http://localhost:9000/app");

  } catch (error: any) {
    logger.error("❌ Error creating demo tenants:", error.message);
    throw error;
  }
}