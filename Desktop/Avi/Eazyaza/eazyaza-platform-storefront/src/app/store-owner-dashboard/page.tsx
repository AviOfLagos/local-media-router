'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { retrieveCustomer } from '@lib/data/customer'

interface StoreOwnerStats {
  totalProducts: number
  totalOrders: number
  monthlyRevenue: string
  storeViews: number
}

export default function StoreOwnerDashboard() {
  const router = useRouter()
  const [customer, setCustomer] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<StoreOwnerStats>({
    totalProducts: 0,
    totalOrders: 0,
    monthlyRevenue: '$0.00',
    storeViews: 0
  })

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const customerData = await retrieveCustomer()
        if (!customerData) {
          router.push('/account')
          return
        }
        setCustomer(customerData)

        // TODO: Fetch real store stats when tenant system is implemented
        setStats({
          totalProducts: 12,
          totalOrders: 8,
          monthlyRevenue: '$2,450.00',
          storeViews: 1543
        })
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/account')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="text-2xl">🏪</div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Store Owner Dashboard</h1>
                  <p className="text-xs text-gray-600">Welcome, {customer?.first_name}!</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/setup-wizard" className="text-blue-600 hover:text-blue-700 text-sm">
                Setup Wizard
              </Link>
              <Link href="/account" className="text-gray-600 hover:text-gray-900 text-sm">
                Account Settings
              </Link>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {customer?.first_name?.[0] || 'S'}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome to Your Store!</h2>
              <p className="text-blue-100">
                Manage your products, track orders, and grow your business with EazyAza's powerful tools.
              </p>
            </div>
            <div className="text-6xl opacity-20">🚀</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
              <div className="text-3xl">📦</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
              <div className="text-3xl">📋</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Monthly Revenue</p>
                <p className="text-2xl font-bold text-green-600">{stats.monthlyRevenue}</p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Store Views</p>
                <p className="text-2xl font-bold text-gray-900">{stats.storeViews}</p>
              </div>
              <div className="text-3xl">👀</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/setup-wizard"
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-center"
                >
                  <div className="text-2xl mb-2">⚙️</div>
                  <h4 className="font-medium text-gray-900 mb-1">Setup Wizard</h4>
                  <p className="text-xs text-gray-600">Complete store setup</p>
                </Link>

                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-center cursor-pointer">
                  <div className="text-2xl mb-2">📸</div>
                  <h4 className="font-medium text-gray-900 mb-1">Import from Instagram</h4>
                  <p className="text-xs text-gray-600">Add products from IG</p>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-center cursor-pointer">
                  <div className="text-2xl mb-2">➕</div>
                  <h4 className="font-medium text-gray-900 mb-1">Add Product</h4>
                  <p className="text-xs text-gray-600">Create new product</p>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-center cursor-pointer">
                  <div className="text-2xl mb-2">🎨</div>
                  <h4 className="font-medium text-gray-900 mb-1">Customize Store</h4>
                  <p className="text-xs text-gray-600">Edit theme & branding</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">📦</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">New order received</p>
                    <p className="text-xs text-gray-600">2 minutes ago</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm">👤</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">New customer signup</p>
                    <p className="text-xs text-gray-600">1 hour ago</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-sm">📈</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Store views increased</p>
                    <p className="text-xs text-gray-600">3 hours ago</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-gray-400 text-4xl mb-2">🚧</div>
                    <p className="text-sm text-gray-600">
                      Full store management features coming soon! Complete your setup wizard to prepare.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">⚡</div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                  Ready to Launch Your Store?
                </h3>
                <p className="text-yellow-800 mb-4">
                  You're signed in as a store owner! Complete these steps to get your store ready for customers:
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-600">•</span>
                    <span className="text-sm text-yellow-800">Complete the Setup Wizard to configure your store</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-600">•</span>
                    <span className="text-sm text-yellow-800">Add your first products (Instagram import available)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-600">•</span>
                    <span className="text-sm text-yellow-800">Customize your store theme and branding</span>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Link
                    href="/setup-wizard"
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 text-sm font-medium"
                  >
                    Continue Setup →
                  </Link>
                  <Link
                    href="/marketplace"
                    className="text-yellow-700 hover:text-yellow-800 text-sm font-medium"
                  >
                    View Marketplace
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}