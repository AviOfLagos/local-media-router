'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { retrieveCustomer } from '@lib/data/customer'

export default function DashboardNavigation() {
  const [customer, setCustomer] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const customerData = await retrieveCustomer()
        setCustomer(customerData)
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">EazyAza Dashboard Navigation</h1>
          <p className="text-gray-600">Choose your dashboard type during development</p>
          {customer && (
            <p className="text-sm text-gray-500 mt-2">
              Logged in as: {customer.first_name} {customer.last_name} ({customer.email})
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Shopper Dashboard */}
          <Link
            href="/shopper-dashboard"
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">🛒</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Shopper Dashboard</h3>
              <p className="text-gray-600 text-sm mb-4">
                View your orders, track packages, manage wishlist, and discover new stores.
              </p>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                For Buyers
              </div>
            </div>
          </Link>

          {/* Store Owner Dashboard */}
          <Link
            href="/store-owner-dashboard"
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">🏪</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Store Owner Dashboard</h3>
              <p className="text-gray-600 text-sm mb-4">
                Manage your store, add products, track sales, and customize your storefront.
              </p>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                For Sellers
              </div>
            </div>
          </Link>

          {/* Super Admin Dashboard */}
          <Link
            href="/admin"
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Super Admin Dashboard</h3>
              <p className="text-gray-600 text-sm mb-4">
                Manage the entire platform, monitor stores, handle disputes, and platform settings.
              </p>
              <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">
                For Admins
              </div>
            </div>
          </Link>

          {/* Setup Wizard */}
          <Link
            href="/setup-wizard"
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Setup Wizard</h3>
              <p className="text-gray-600 text-sm mb-4">
                Complete your store setup, add products, configure branding, and launch.
              </p>
              <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                Store Setup
              </div>
            </div>
          </Link>

          {/* Marketplace */}
          <Link
            href="/marketplace"
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Marketplace</h3>
              <p className="text-gray-600 text-sm mb-4">
                Browse all stores, discover products, and shop from different vendors.
              </p>
              <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                Public View
              </div>
            </div>
          </Link>

          {/* Account Settings */}
          <Link
            href="/account"
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">👤</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Account Settings</h3>
              <p className="text-gray-600 text-sm mb-4">
                Manage your profile, addresses, passwords, and account preferences.
              </p>
              <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                Account
              </div>
            </div>
          </Link>
        </div>

        {/* Development Info */}
        <div className="mt-12">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">🚧</div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Development Dashboard Navigation
                </h3>
                <p className="text-blue-800 mb-4">
                  This navigation page helps during development to easily switch between different user dashboard types.
                  In production, users will be automatically redirected to the appropriate dashboard based on their role.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span className="text-sm text-blue-700">All dashboards are temporary and will be replaced with full multi-tenant system</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span className="text-sm text-blue-700">User authentication and authorization are working correctly</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span className="text-sm text-blue-700">Setup wizard properly redirects to store owner dashboard</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!customer && (
          <div className="mt-8 text-center">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="text-2xl mb-2">🔐</div>
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">Authentication Required</h3>
              <p className="text-yellow-800 mb-4">
                You need to be logged in to access most dashboards. Please sign in or create an account.
              </p>
              <div className="space-x-4">
                <Link
                  href="/account"
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 inline-block"
                >
                  Sign In / Register
                </Link>
                <Link
                  href="/"
                  className="text-yellow-700 hover:text-yellow-800 inline-block"
                >
                  Go Home
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}