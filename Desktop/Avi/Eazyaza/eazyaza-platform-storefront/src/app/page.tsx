import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EazyAza - Multi-Tenant E-commerce Platform',
  description: 'Create your online store or shop from thousands of merchants. Multi-region support, AI-powered, and fully customizable.',
  openGraph: {
    title: 'EazyAza Platform',
    description: 'The complete e-commerce solution for businesses and shoppers worldwide',
    images: ['/opengraph-image.jpg'],
  }
};

export default function EazyAzaLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">🛍️</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">EazyAza</h1>
              <p className="text-sm text-gray-600">E-commerce Platform</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-gray-600 hover:text-gray-900">Features</Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
            <Link href="#about" className="text-gray-600 hover:text-gray-900">About</Link>
            <Link href="/marketplace" className="text-blue-600 hover:text-blue-700 font-medium">
              Browse Marketplace
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Launch Your Online Store
            <span className="text-blue-600"> or Shop </span>
            from Global Merchants
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            EazyAza is the ultimate multi-tenant e-commerce platform. Create your branded online store
            with AI-powered content generation, or discover products from thousands of merchants worldwide.
          </p>

          {/* User Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Store Owner Option */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🏪</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">I'm a Store Owner</h3>
              <p className="text-gray-600 mb-6">
                Create your own branded e-commerce store with custom subdomain, AI content generation,
                and multi-currency support.
              </p>
              <ul className="text-left text-sm text-gray-600 mb-6 space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Custom subdomain (yourstore.eazyaza.com)
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  AI-powered product descriptions
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Multi-currency & multi-region
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Sales analytics & insights
                </li>
              </ul>
              <Link
                href="/become-a-seller"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
              >
                Start Your Store
              </Link>
            </div>

            {/* Shopper Option */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🛒</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">I'm a Shopper</h3>
              <p className="text-gray-600 mb-6">
                Discover and shop from thousands of unique stores worldwide. Find products
                from local and international merchants.
              </p>
              <ul className="text-left text-sm text-gray-600 mb-6 space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Browse thousands of stores
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Global product discovery
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Secure checkout process
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Multi-currency support
                </li>
              </ul>
              <div className="space-y-3">
                <Link
                  href="/marketplace"
                  className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors inline-block"
                >
                  Browse Marketplace
                </Link>
                <Link
                  href="/us/account?signup=shopper"
                  className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors inline-block"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Stores Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Demo Stores</h2>
            <p className="text-lg text-gray-600">See how different businesses use EazyAza to power their online presence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'ACME Store', subdomain: 'acme-store', theme: 'Tech & Gadgets', currency: 'USD' },
              { name: 'Fashion Hub', subdomain: 'fashion-hub', theme: 'Fashion & Style', currency: 'EUR' },
              { name: 'Naija Market', subdomain: 'naija-market', theme: 'African Products', currency: 'NGN' },
              { name: 'Tech World', subdomain: 'tech-world', theme: 'Electronics', currency: 'CAD' }
            ].map((store) => (
              <div key={store.subdomain} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="text-2xl mb-3">🏪</div>
                <h3 className="font-semibold text-gray-900 mb-2">{store.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{store.theme}</p>
                <p className="text-xs text-gray-500 mb-4">Currency: {store.currency}</p>
                <Link
                  href={`http://${store.subdomain}.localhost:8000`}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  target="_blank"
                >
                  Visit Store →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose EazyAza?</h2>
            <p className="text-lg text-gray-600">Everything you need to succeed in e-commerce</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-3">Global Reach</h3>
              <p className="text-gray-600">Support for 5+ regions and currencies. Sell to customers worldwide with localized experiences.</p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered</h3>
              <p className="text-gray-600">Generate product descriptions, marketing content, and get intelligent sales recommendations.</p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">Fast Setup</h3>
              <p className="text-gray-600">Launch your store in minutes, not weeks. Complete branding and customization tools included.</p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3">Analytics</h3>
              <p className="text-gray-600">Comprehensive sales analytics, customer insights, and performance tracking.</p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-3">Secure</h3>
              <p className="text-gray-600">Enterprise-grade security with data isolation and secure payment processing.</p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-3">Customizable</h3>
              <p className="text-gray-600">Full branding control with custom themes, colors, and layout options.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600">Choose the plan that fits your business needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                price: '$99',
                description: 'Perfect for new businesses',
                features: ['Custom subdomain', 'Basic analytics', 'Email support', 'Up to 100 products']
              },
              {
                name: 'Professional',
                price: '$299',
                description: 'Advanced features for growing stores',
                features: ['AI content generation', 'Advanced analytics', 'Priority support', 'Unlimited products', 'Multi-currency']
              },
              {
                name: 'Enterprise',
                price: '$999',
                description: 'Full-featured for large businesses',
                features: ['White-label solution', 'Custom integrations', 'Dedicated support', 'Advanced AI features', 'SLA guarantee']
              }
            ].map((plan, index) => (
              <div key={plan.name} className={`bg-white p-8 rounded-lg shadow-sm border ${index === 1 ? 'ring-2 ring-blue-500' : ''}`}>
                {index === 1 && (
                  <div className="text-center text-sm text-blue-600 font-medium mb-4">MOST POPULAR</div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{plan.price}</div>
                  <div className="text-sm text-gray-600">per month</div>
                  <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/us/account?signup=store-owner"
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors inline-block text-center ${
                    index === 1
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="text-2xl">🛍️</div>
                <span className="text-xl font-bold">EazyAza</span>
              </div>
              <p className="text-gray-400 text-sm">
                The complete multi-tenant e-commerce platform for businesses worldwide.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/marketplace" className="hover:text-white">Marketplace</Link></li>
                <li><Link href="/us/account?signup=store-owner" className="hover:text-white">Create Store</Link></li>
                <li><Link href="#features" className="hover:text-white">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/docs" className="hover:text-white">Documentation</Link></li>
                <li><Link href="/status" className="hover:text-white">Status</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 EazyAza Platform. All rights reserved.</p>
            <p className="mt-1">Multi-tenant e-commerce solution with global reach.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}