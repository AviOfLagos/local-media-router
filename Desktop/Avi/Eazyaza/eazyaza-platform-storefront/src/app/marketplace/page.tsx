import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EazyAza Marketplace - Shop from Global Merchants',
  description: 'Discover and shop from thousands of unique stores worldwide. Find products from local and international merchants.',
  openGraph: {
    title: 'EazyAza Marketplace',
    description: 'Shop from thousands of stores worldwide',
    images: ['/opengraph-image.jpg'],
  }
};

export default function MarketplacePage() {
  const featuredStores = [
    { name: 'ACME Store', subdomain: 'acme-store', theme: 'Tech & Gadgets', currency: 'USD', products: '150+' },
    { name: 'Fashion Hub', subdomain: 'fashion-hub', theme: 'Fashion & Style', currency: 'EUR', products: '320+' },
    { name: 'Naija Market', subdomain: 'naija-market', theme: 'African Products', currency: 'NGN', products: '89+' },
    { name: 'Tech World', subdomain: 'tech-world', theme: 'Electronics', currency: 'CAD', products: '210+' }
  ];

  const categories = [
    { name: 'Electronics', icon: '📱', count: '2,450 products' },
    { name: 'Fashion', icon: '👗', count: '3,120 products' },
    { name: 'Home & Garden', icon: '🏠', count: '1,890 products' },
    { name: 'Sports', icon: '⚽', count: '1,230 products' },
    { name: 'Beauty', icon: '💄', count: '980 products' },
    { name: 'Books', icon: '📚', count: '750 products' },
    { name: 'Toys', icon: '🧸', count: '560 products' },
    { name: 'Automotive', icon: '🚗', count: '890 products' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="text-2xl">🛍️</div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">EazyAza</h1>
                  <p className="text-xs text-gray-600">Marketplace</p>
                </div>
              </Link>

              {/* Search Bar */}
              <div className="hidden md:block ml-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products, stores, or categories..."
                    className="w-96 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <span className="text-gray-400">🔍</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/account" className="text-gray-600 hover:text-gray-900">
                👤 Account
              </Link>
              <Link href="/cart" className="text-gray-600 hover:text-gray-900">
                🛒 Cart
              </Link>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Shop from thousands of unique stores worldwide - all in one place
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link
              href="#stores"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Stores
            </Link>
            <Link
              href="#categories"
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Shop by Category
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600">Find exactly what you're looking for</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/marketplace/category/${category.name.toLowerCase().replace(/ /g, '-')}`}
                className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-all hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stores Section */}
      <section id="stores" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Stores</h2>
            <p className="text-lg text-gray-600">Discover unique merchants from around the world</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredStores.map((store) => (
              <div key={store.subdomain} className="bg-gray-50 p-6 rounded-lg border hover:shadow-md transition-shadow">
                <div className="text-center">
                  <div className="text-3xl mb-4">🏪</div>
                  <h3 className="font-bold text-gray-900 mb-2">{store.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{store.theme}</p>
                  <p className="text-xs text-gray-500 mb-4">{store.products} • {store.currency}</p>

                  <div className="space-y-2">
                    <Link
                      href={`http://${store.subdomain}.localhost:8000`}
                      className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                      target="_blank"
                    >
                      Visit Store
                    </Link>
                    <Link
                      href={`/marketplace/store/${store.subdomain}`}
                      className="block w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm"
                    >
                      Browse Products
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/marketplace/stores"
              className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              View All Stores →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">2,500+</div>
              <div className="text-gray-400">Active Stores</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50K+</div>
              <div className="text-gray-400">Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-gray-400">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100K+</div>
              <div className="text-gray-400">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">Get notified about new stores, products, and special offers</p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="text-xl">🛍️</div>
              <span className="font-bold">EazyAza Marketplace</span>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <Link href="/" className="hover:text-gray-300">Platform Home</Link>
              <Link href="/help" className="hover:text-gray-300">Help</Link>
              <Link href="/contact" className="hover:text-gray-300">Contact</Link>
              <Link href="/terms" className="hover:text-gray-300">Terms</Link>
            </div>
          </div>

          <div className="text-center text-sm text-gray-400 mt-6 pt-6 border-t border-gray-700">
            © 2025 EazyAza Platform. Marketplace for global commerce.
          </div>
        </div>
      </footer>
    </div>
  );
}