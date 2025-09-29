'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { retrieveCustomer } from '@lib/data/customer'

interface WizardStep {
  id: string
  title: string
  description: string
  completed: boolean
}

const WIZARD_STEPS: WizardStep[] = [
  {
    id: 'products',
    title: 'Add Products',
    description: 'Start building your catalog with products',
    completed: false
  },
  {
    id: 'configuration',
    title: 'Store Configuration',
    description: 'Set up your store details and settings',
    completed: false
  },
  {
    id: 'branding',
    title: 'Branding',
    description: 'Customize your store appearance',
    completed: false
  },
  {
    id: 'complete',
    title: 'Complete',
    description: 'Launch your store',
    completed: false
  }
]

export default function SetupWizardPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState(WIZARD_STEPS)
  const [storeData, setStoreData] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [customer, setCustomer] = useState<any>(null)

  // Check if user is authenticated and authorized for setup wizard
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const customerData = await retrieveCustomer()
        if (!customerData) {
          router.push('/account')
          return
        }

        setCustomer(customerData)
        // TODO: Add store owner verification when tenant system is complete
        // For now, allow authenticated users to access setup wizard

      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/account')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleStepComplete = (stepData: any) => {
    setStoreData(prev => ({ ...prev, [steps[currentStep].id]: stepData }))

    // Mark current step as completed
    setSteps(prev => prev.map((step, index) =>
      index === currentStep ? { ...step, completed: true } : step
    ))

    // Move to next step
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleStepBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderCurrentStep = () => {
    switch (steps[currentStep].id) {
      case 'products':
        return <ProductsStep onComplete={handleStepComplete} onBack={handleStepBack} />
      case 'configuration':
        return <ConfigurationStep onComplete={handleStepComplete} onBack={handleStepBack} storeData={storeData} />
      case 'branding':
        return <BrandingStep onComplete={handleStepComplete} onBack={handleStepBack} storeData={storeData} />
      case 'complete':
        return <CompleteStep storeData={storeData} />
      default:
        return null
    }
  }

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
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🛍️</div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Store Setup</h1>
                <p className="text-sm text-gray-600">Get your store ready for customers</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex-1 relative">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index < currentStep
                      ? 'bg-green-500 text-white'
                      : index === currentStep
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index < currentStep ? '✓' : index + 1}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className={`text-sm font-medium ${
                      index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`absolute top-4 left-8 w-full h-0.5 ${
                    index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`} style={{ width: 'calc(100% - 2rem)' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {renderCurrentStep()}
      </main>
    </div>
  )
}

// Step Components
function ProductsStep({ onComplete, onBack }: { onComplete: (data: any) => void; onBack: () => void }) {
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [showInstagramImport, setShowInstagramImport] = useState(false)

  const handleContinue = () => {
    if (selectedOption === 'instagram') {
      setShowInstagramImport(true)
    } else {
      onComplete({ productMethod: selectedOption })
    }
  }

  const handleInstagramComplete = (data: any) => {
    onComplete({ productMethod: 'instagram', ...data })
  }

  if (showInstagramImport) {
    return <InstagramImportFlow onComplete={handleInstagramComplete} onBack={() => setShowInstagramImport(false)} />
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Your First Products</h2>
        <p className="text-gray-600">
          Choose how you'd like to start building your product catalog. You can always add more products later.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div
          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
            selectedOption === 'instagram'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setSelectedOption('instagram')}
        >
          <div className="text-3xl mb-2">📸</div>
          <h3 className="font-semibold text-gray-900 mb-1">Import from Instagram</h3>
          <p className="text-sm text-gray-600">
            Automatically import products from your Instagram posts
          </p>
        </div>

        <div
          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
            selectedOption === 'manual'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setSelectedOption('manual')}
        >
          <div className="text-3xl mb-2">✏️</div>
          <h3 className="font-semibold text-gray-900 mb-1">Add Manually</h3>
          <p className="text-sm text-gray-600">
            Create products one by one with full control
          </p>
        </div>

        <div
          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
            selectedOption === 'bulk'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setSelectedOption('bulk')}
        >
          <div className="text-3xl mb-2">📄</div>
          <h3 className="font-semibold text-gray-900 mb-1">Bulk Import</h3>
          <p className="text-sm text-gray-600">
            Upload a CSV or Excel file with your products
          </p>
        </div>

        <div
          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
            selectedOption === 'skip'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setSelectedOption('skip')}
        >
          <div className="text-3xl mb-2">⏭️</div>
          <h3 className="font-semibold text-gray-900 mb-1">Skip for Now</h3>
          <p className="text-sm text-gray-600">
            Set up your store first, add products later
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 text-gray-600 hover:text-gray-900"
          disabled
        >
          ← Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!selectedOption}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Continue →
        </button>
      </div>
    </div>
  )
}

function ConfigurationStep({ onComplete, onBack, storeData }: {
  onComplete: (data: any) => void;
  onBack: () => void;
  storeData: any;
}) {
  const [formData, setFormData] = useState({
    storeUrl: '',
    businessType: '',
    description: '',
    fullDescription: ''
  })

  const handleContinue = () => {
    onComplete(formData)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Store Configuration</h2>
        <p className="text-gray-600">
          Set up your store details and basic configuration.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Store URL
          </label>
          <div className="flex items-center">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2"
              placeholder="your-store"
              value={formData.storeUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, storeUrl: e.target.value }))}
            />
            <span className="bg-gray-50 border border-l-0 border-gray-300 rounded-r-lg px-3 py-2 text-gray-600">
              .eazyaza.com
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Type
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            value={formData.businessType}
            onChange={(e) => setFormData(prev => ({ ...prev, businessType: e.target.value }))}
          >
            <option value="">Select business type</option>
            <option value="fashion">Fashion & Apparel</option>
            <option value="electronics">Electronics</option>
            <option value="home">Home & Garden</option>
            <option value="beauty">Beauty & Personal Care</option>
            <option value="sports">Sports & Outdoors</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brief Description (140 characters)
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            rows={2}
            maxLength={140}
            placeholder="Brief description of your store..."
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          />
          <p className="text-xs text-gray-500 mt-1">{formData.description.length}/140</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Description (Optional)
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            rows={4}
            placeholder="Detailed description of your store and products..."
            value={formData.fullDescription}
            onChange={(e) => setFormData(prev => ({ ...prev, fullDescription: e.target.value }))}
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          ← Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!formData.storeUrl || !formData.businessType || !formData.description}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Continue →
        </button>
      </div>
    </div>
  )
}

function BrandingStep({ onComplete, onBack, storeData }: {
  onComplete: (data: any) => void;
  onBack: () => void;
  storeData: any;
}) {
  const [formData, setFormData] = useState({
    logo: null,
    primaryColor: '#3B82F6',
    fontFamily: 'Inter'
  })

  const handleContinue = () => {
    onComplete(formData)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Store Branding</h2>
        <p className="text-gray-600">
          Customize your store's appearance and branding.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Store Logo
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div className="text-gray-400 mb-2">📸</div>
            <p className="text-sm text-gray-600 mb-2">
              Drop your logo here or click to upload
            </p>
            <button className="text-blue-600 hover:text-blue-700 text-sm">
              Choose File
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Color
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={formData.primaryColor}
              onChange={(e) => setFormData(prev => ({ ...prev, primaryColor: e.target.value }))}
              className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
            />
            <input
              type="text"
              value={formData.primaryColor}
              onChange={(e) => setFormData(prev => ({ ...prev, primaryColor: e.target.value }))}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Family
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            value={formData.fontFamily}
            onChange={(e) => setFormData(prev => ({ ...prev, fontFamily: e.target.value }))}
          >
            <option value="Inter">Inter</option>
            <option value="Roboto">Roboto</option>
            <option value="Open Sans">Open Sans</option>
            <option value="Lato">Lato</option>
            <option value="Montserrat">Montserrat</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          ← Back
        </button>
        <button
          onClick={handleContinue}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Continue →
        </button>
      </div>
    </div>
  )
}

function CompleteStep({ storeData }: { storeData: any }) {
  const router = useRouter()

  const handleLaunch = () => {
    // TODO: Submit all store data and launch store
    console.log('Store data:', storeData)
    // Redirect to store owner dashboard
    router.push('/store-owner-dashboard')
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
      <div className="mb-6">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Congratulations!</h2>
        <p className="text-lg text-gray-600">
          Your store is ready to launch. You can always make changes later.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-2">What's Next?</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>✓ Your store is live and ready for customers</li>
          <li>✓ Start adding more products to your catalog</li>
          <li>✓ Share your store URL with customers</li>
          <li>✓ Monitor your sales and analytics</li>
        </ul>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleLaunch}
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700"
        >
          Launch My Store 🚀
        </button>
        <button
          onClick={() => router.push('/store-owner-dashboard')}
          className="w-full bg-gray-100 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-200"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  )
}

function InstagramImportFlow({ onComplete, onBack }: {
  onComplete: (data: any) => void;
  onBack: () => void;
}) {
  const [step, setStep] = useState<'username' | 'select'>('username')
  const [username, setUsername] = useState('')
  const [posts, setPosts] = useState<any[]>([])
  const [selectedPosts, setSelectedPosts] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUsernameSubmit = async () => {
    if (!username.trim()) {
      setError('Please enter a valid Instagram username')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/instagram/import`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          storeId: 'temp-store-id'
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch Instagram posts')
      }

      const data = await response.json()
      setPosts(data.posts)
      setStep('select')
    } catch (err: any) {
      setError(err.message || 'Failed to import from Instagram')
    } finally {
      setLoading(false)
    }
  }

  const togglePostSelection = (postId: string) => {
    setSelectedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  const handleImportComplete = () => {
    const selectedPostData = posts.filter(post => selectedPosts.includes(post.id))
    onComplete({
      username,
      selectedPosts: selectedPostData,
      totalImported: selectedPosts.length
    })
  }

  if (step === 'username') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Import from Instagram</h2>
          <p className="text-gray-600">
            Enter your Instagram username to automatically import products from your posts.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instagram Username
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">@</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="yourusername"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                disabled={loading}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">How it works:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• We'll fetch your recent Instagram posts</li>
              <li>• You can select which posts to turn into products</li>
              <li>• Product details will be auto-generated from your captions</li>
              <li>• You can edit everything later in your dashboard</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={onBack}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
          <button
            onClick={handleUsernameSubmit}
            disabled={loading || !username.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {loading ? (
              <>
                <span>Importing...</span>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </>
            ) : (
              <span>Import Posts →</span>
            )}
          </button>
        </div>
      </div>
    )
  }

  if (step === 'select') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Products to Import</h2>
          <p className="text-gray-600">
            Choose which Instagram posts you'd like to turn into products. Selected: {selectedPosts.length}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto mb-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className={`relative border-2 rounded-lg overflow-hidden cursor-pointer transition-colors ${
                selectedPosts.includes(post.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => togglePostSelection(post.id)}
            >
              <img
                src={post.image_url}
                alt={post.caption}
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <p className="text-sm text-gray-600 line-clamp-2">{post.caption}</p>
                <p className="text-xs text-blue-600 mt-1 font-medium">
                  → {post.suggested_title}
                </p>
              </div>
              {selectedPosts.includes(post.id) && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">
                  ✓
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setStep('username')}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
          <div className="space-x-2">
            <button
              onClick={() => setSelectedPosts(posts.map(p => p.id))}
              className="px-4 py-2 text-blue-600 hover:text-blue-700"
            >
              Select All
            </button>
            <button
              onClick={handleImportComplete}
              disabled={selectedPosts.length === 0}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Import {selectedPosts.length} Products →
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}