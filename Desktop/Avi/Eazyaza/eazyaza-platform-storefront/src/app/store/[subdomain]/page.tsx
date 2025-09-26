import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTenantData, createFallbackTenant } from '@lib/tenant-utils';

export async function generateMetadata({
  params
}: {
  params: Promise<{ subdomain: string }>;
}): Promise<Metadata> {
  const { subdomain } = await params;
  let tenantData = await getTenantData(subdomain);

  if (!tenantData) {
    tenantData = createFallbackTenant(subdomain);
  }

  return {
    title: `${tenantData.name} - EazyAza Store`,
    description: tenantData.description || `Shop at ${tenantData.name}`,
    openGraph: {
      title: tenantData.name,
      description: tenantData.description || `Shop at ${tenantData.name}`,
      images: tenantData.logo_url ? [tenantData.logo_url] : [],
    }
  };
}

export default async function TenantStorePage({
  params
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  let tenantData = await getTenantData(subdomain);

  // Create fallback tenant for development/demo
  if (!tenantData) {
    console.log(`Creating fallback tenant page for: ${subdomain}`);
    tenantData = createFallbackTenant(subdomain);
  }

  const themeStyles = {
    '--primary-color': tenantData.theme_config.primaryColor,
    '--secondary-color': tenantData.theme_config.secondaryColor,
    '--font-family': tenantData.theme_config.fontFamily,
  } as React.CSSProperties;

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white"
      style={themeStyles}
    >
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {tenantData.logo_url && (
              <img
                src={tenantData.logo_url}
                alt={`${tenantData.name} logo`}
                className="h-8 w-auto"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900" style={{ color: 'var(--primary-color)' }}>
                {tenantData.name}
              </h1>
              {tenantData.description && (
                <p className="text-sm text-gray-600">{tenantData.description}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              Currency: {tenantData.default_currency.toUpperCase()}
            </span>
            <Link
              href="/us"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Platform Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to {tenantData.name}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {tenantData.description || `Your one-stop shop for quality products. Start shopping now!`}
          </p>
        </div>

        {/* Store Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
            <div className="text-3xl mb-4">🛍️</div>
            <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
            <p className="text-gray-600">Curated selection of premium items</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
            <div className="text-3xl mb-4">🚚</div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Quick shipping to your region</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
            <div className="text-3xl mb-4">💳</div>
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-600">Safe and secure checkout process</p>
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            🚧 Store Setup in Progress
          </h3>
          <p className="text-yellow-700 mb-4">
            This tenant store is being configured. Product catalog, shopping cart, and checkout features are coming soon!
          </p>
          <div className="text-sm text-yellow-600">
            <strong>Tenant Info:</strong>
            <br />
            Subdomain: {subdomain}
            <br />
            ID: {tenantData.id}
            <br />
            Currency: {tenantData.default_currency}
            <br />
            Regions: {tenantData.supported_regions.join(', ')}
          </div>
        </div>

        {/* Admin Link (for development) */}
        <div className="mt-8 text-center">
          <Link
            href="/admin"
            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            🔧 Admin Dashboard (Configure Store)
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>© 2025 {tenantData.name}. Powered by EazyAza Platform.</p>
            <p className="mt-1">Multi-tenant e-commerce solution</p>
          </div>
        </div>
      </footer>
    </div>
  );
}