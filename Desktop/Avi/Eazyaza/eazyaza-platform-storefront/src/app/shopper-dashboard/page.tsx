'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { retrieveCustomer } from '@lib/data/customer'

interface ShopperStats {
  totalOrders: number
  totalSpent: string
  savedItems: number
  storesVisited: number
}

export default function ShopperDashboard() {
  const router = useRouter()
  const [customer, setCustomer] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<ShopperStats>({
    totalOrders: 0,
    totalSpent: '$0.00',
    savedItems: 0,
    storesVisited: 0
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

        // TODO: Fetch real shopper stats when system is implemented
        setStats({
          totalOrders: 5,
          totalSpent: '$1,245.50',
          savedItems: 12,
          storesVisited: 8
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
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
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
                <div className="text-2xl">🛒</div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Shopper Dashboard</h1>
                  <p className="text-xs text-gray-600">Welcome back, {customer?.first_name}!</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/marketplace" className="text-green-600 hover:text-green-700 text-sm">
                Browse Stores
              </Link>
              <Link href="/account" className="text-gray-600 hover:text-gray-900 text-sm">
                Account Settings
              </Link>
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {customer?.first_name?.[0] || 'S'}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Happy Shopping!</h2>
              <p className="text-green-100">
                Discover unique stores, track your orders, and enjoy personalized shopping experiences.
              </p>
            </div>
            <div className="text-6xl opacity-20">🎉</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
              <div className="text-3xl">📦</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                <p className="text-2xl font-bold text-green-600">{stats.totalSpent}</p>
              </div>
              <div className="text-3xl">💳</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Saved Items</p>
                <p className="text-2xl font-bold text-gray-900">{stats.savedItems}</p>
              </div>
              <div className="text-3xl">❤️</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Stores Visited</p>
                <p className="text-2xl font-bold text-gray-900">{stats.storesVisited}</p>
              </div>
              <div className="text-3xl">🏪</div>
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
                  href="/marketplace"
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-center"
                >
                  <div className="text-2xl mb-2">🛍️</div>
                  <h4 className="font-medium text-gray-900 mb-1">Browse Stores</h4>
                  <p className="text-xs text-gray-600">Discover new stores</p>
                </Link>

                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-center cursor-pointer">
                  <div className="text-2xl mb-2">📋</div>
                  <h4 className="font-medium text-gray-900 mb-1">My Orders</h4>
                  <p className="text-xs text-gray-600">Track your orders</p>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-center cursor-pointer">
                  <div className="text-2xl mb-2">❤️</div>
                  <h4 className="font-medium text-gray-900 mb-1">Wishlist</h4>
                  <p className="text-xs text-gray-600">Saved items</p>
                </div>

                <Link
                  href="/account"
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-center"
                >
                  <div className="text-2xl mb-2">⚙️</div>
                  <h4 className="font-medium text-gray-900 mb-1">Settings</h4>
                  <p className="text-xs text-gray-600">Manage account</p>
                </Link>
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
                    <span className="text-green-600 text-sm">🚚</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Order #1234 shipped</p>
                    <p className="text-xs text-gray-600">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm">🛒</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Added item to wishlist</p>
                    <p className="text-xs text-gray-600">1 day ago</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-sm">🏪</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Discovered new store</p>
                    <p className="text-xs text-gray-600">2 days ago</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-gray-400 text-4xl mb-2">🚧</div>
                    <p className="text-sm text-gray-600">
                      Full order history and wishlist features coming soon! Browse our marketplace in the meantime.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Stores */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recommended Stores</h3>
                <Link href="/marketplace" className="text-green-600 hover:text-green-700 text-sm">
                  View all →
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      🎨
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Art & Crafts Store</h4>
                      <p className="text-xs text-gray-600">Creative supplies</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Handmade art supplies and creative materials for all skill levels.</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      👔
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Fashion Forward</h4>
                      <p className="text-xs text-gray-600">Trendy clothing</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Latest fashion trends and timeless pieces for every occasion.</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      💻
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Tech Hub</h4>
                      <p className="text-xs text-gray-600">Electronics</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Latest gadgets and technology solutions for modern living.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Explore Banner */}
        <div className="mt-8">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Explore Unique Stores</h3>
                <p className="text-purple-100 mb-4">
                  Discover amazing products from independent sellers around the world.
                </p>
                <Link
                  href="/marketplace"
                  className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium inline-block"
                >
                  Browse Marketplace →
                </Link>
              </div>
              <div className="text-6xl opacity-20">🌟</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}