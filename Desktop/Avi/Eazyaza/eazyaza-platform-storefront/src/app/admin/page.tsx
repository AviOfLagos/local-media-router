import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EazyAza Platform Admin Dashboard',
  description: 'Super Admin dashboard for EazyAza platform management',
};

export default function SuperAdminDashboard() {
  const stats = [
    { label: 'Active Stores', value: '2,547', change: '+12%', color: 'text-green-600' },
    { label: 'Total Products', value: '52,431', change: '+8%', color: 'text-green-600' },
    { label: 'Monthly Revenue', value: '$284,567', change: '+15%', color: 'text-green-600' },
    { label: 'Active Users', value: '18,942', change: '+5%', color: 'text-green-600' },
  ];

  const recentStores = [
    { name: 'TechHub Electronics', subdomain: 'techhub', status: 'active', plan: 'Professional', created: '2025-01-15' },
    { name: 'Fashion Forward', subdomain: 'fashion-forward', status: 'pending', plan: 'Starter', created: '2025-01-14' },
    { name: 'Green Garden Co', subdomain: 'green-garden', status: 'active', plan: 'Enterprise', created: '2025-01-13' },
    { name: 'Sports Central', subdomain: 'sports-central', status: 'active', plan: 'Professional', created: '2025-01-12' },
  ];

  const systemHealth = [
    { service: 'Backend API', status: 'healthy', uptime: '99.9%' },
    { service: 'Database', status: 'healthy', uptime: '99.8%' },
    { service: 'Redis Cache', status: 'healthy', uptime: '99.9%' },
    { service: 'File Storage', status: 'warning', uptime: '98.5%' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="text-2xl">🛍️</div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">EazyAza</h1>
                  <p className="text-xs text-gray-600">Super Admin</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Admin User</span>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Super Admin Dashboard</h1>
          <p className="text-gray-600">Manage the entire EazyAza multi-tenant platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <span className={`text-sm font-medium ${stat.color}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Stores */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Stores</h2>
                <Link href="/admin/stores" className="text-blue-600 hover:text-blue-700 text-sm">
                  View all →
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentStores.map((store) => (
                  <div key={store.subdomain} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          🏪
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{store.name}</p>
                          <p className="text-sm text-gray-600">{store.subdomain}.eazyaza.com</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        store.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {store.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{store.plan}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">System Health</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {systemHealth.map((service) => (
                  <div key={service.service} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        service.status === 'healthy'
                          ? 'bg-green-500'
                          : service.status === 'warning'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}></div>
                      <span className="font-medium text-gray-900">{service.service}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-600">{service.uptime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/admin/stores/new"
              className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow text-center"
            >
              <div className="text-3xl mb-2">🏪</div>
              <h3 className="font-medium text-gray-900 mb-1">Create New Store</h3>
              <p className="text-sm text-gray-600">Add a new tenant store to the platform</p>
            </Link>

            <Link
              href="/admin/users"
              className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow text-center"
            >
              <div className="text-3xl mb-2">👥</div>
              <h3 className="font-medium text-gray-900 mb-1">Manage Users</h3>
              <p className="text-sm text-gray-600">View and manage platform users</p>
            </Link>

            <Link
              href="/admin/analytics"
              className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow text-center"
            >
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-medium text-gray-900 mb-1">View Analytics</h3>
              <p className="text-sm text-gray-600">Platform performance and insights</p>
            </Link>
          </div>
        </div>

        {/* Development Notice */}
        <div className="mt-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">🚧</div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Super Admin Dashboard - In Development
                </h3>
                <p className="text-blue-800 mb-4">
                  This dashboard provides an overview of the planned super admin functionality for managing
                  the multi-tenant platform. Features will include:
                </p>
                <ul className="text-sm text-blue-700 space-y-1 mb-4">
                  <li>• Complete tenant store management (create, edit, suspend, delete)</li>
                  <li>• User account management across all tenants</li>
                  <li>• Platform-wide analytics and reporting</li>
                  <li>• System health monitoring and alerts</li>
                  <li>• Billing and subscription management</li>
                  <li>• Global product aggregation controls</li>
                </ul>
                <div className="flex space-x-4">
                  <Link
                    href="/marketplace"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View Marketplace →
                  </Link>
                  <Link
                    href="/"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Platform Home →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}