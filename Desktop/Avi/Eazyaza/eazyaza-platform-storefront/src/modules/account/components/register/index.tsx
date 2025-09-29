"use client"

import { useActionState, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW, USER_TYPE } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import Button from "@modules/common/components/button"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup, generateOtp, checkEmailExists } from "@lib/data/customer"

// Validation functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePhone = (phone: string): boolean => {
  if (!phone) return true // Phone is optional
  const phoneRegex = /^[+]?[0-9\s\-\(\)]{7,15}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
  userType: USER_TYPE
  setUserType: (type: USER_TYPE) => void
}

const Register = ({ setCurrentView, userType, setUserType }: Props) => {
  const router = useRouter()
  const [message, formAction] = useActionState(signup, null)
  const [otpStep, setOtpStep] = useState(false)
  const [otpError, setOtpError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<{
    email: string
    storeName: string
    password: string
  } | null>(null)

  // Separate form states for each user type
  const [shopperFormData, setShopperFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  })

  const [storeOwnerFormData, setStoreOwnerFormData] = useState({
    storeName: '',
    email: '',
    password: ''
  })

  // Handle redirect after successful registration (both store owners and shoppers)
  useEffect(() => {
    if (message && typeof message === 'object' && 'success' in message && message.success && message.redirectTo) {
      router.push(message.redirectTo)
    }
  }, [message, router])

  // Clear form errors and reset form when user type changes
  useEffect(() => {
    setValidationErrors({})
    setOtpError(null)
    setOtpStep(false)
    setFormData(null)
  }, [userType])

  // Helper functions to update form data
  const updateShopperField = (field: keyof typeof shopperFormData, value: string) => {
    setShopperFormData(prev => ({ ...prev, [field]: value }))
  }

  const updateStoreOwnerField = (field: keyof typeof storeOwnerFormData, value: string) => {
    setStoreOwnerFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleOtpRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setOtpError(null)
    setValidationErrors({})

    const email = storeOwnerFormData.email
    const storeName = storeOwnerFormData.storeName
    const password = storeOwnerFormData.password

    // Validation
    const errors: Record<string, string> = {}
    if (!email) errors.email = "Email is required"
    else if (!validateEmail(email)) errors.email = "Please enter a valid email address"
    if (!storeName) errors.storeName = "Store name is required"
    if (!password) errors.password = "Password is required"
    else if (password.length < 6) errors.password = "Password must be at least 6 characters"

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }

    try {
      await generateOtp(email)
      setFormData({ email, storeName, password })
      setOtpStep(true)
    } catch (error: any) {
      setOtpError(error.message)
    }
  }

  const handleFinalSubmit = (formDataToSubmit: FormData) => {
    if (formData) {
      formDataToSubmit.set("email", formData.email)
      formDataToSubmit.set("store_name", formData.storeName)
      formDataToSubmit.set("password", formData.password)
    } else {
      // Fallback to current store owner form data
      formDataToSubmit.set("email", storeOwnerFormData.email)
      formDataToSubmit.set("store_name", storeOwnerFormData.storeName)
      formDataToSubmit.set("password", storeOwnerFormData.password)
    }
    formAction(formDataToSubmit)
  }

  return (
    <div
      className="max-w-sm flex flex-col items-center"
      data-testid="register-page"
    >
      {/* User Type Selector */}
      <div className="w-full mb-6">
        <div className="flex rounded-lg bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => setUserType(USER_TYPE.SHOPPER)}
            className={`flex-1 py-2 px-4 rounded-md text-small-regular transition-colors ${
              userType === USER_TYPE.SHOPPER
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🛒 Shopper
          </button>
          <button
            type="button"
            onClick={() => setUserType(USER_TYPE.STORE_OWNER)}
            className={`flex-1 py-2 px-4 rounded-md text-small-regular transition-colors ${
              userType === USER_TYPE.STORE_OWNER
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🏪 Store Owner
          </button>
        </div>
      </div>

      <h1 className="text-large-semi uppercase mb-6">
        {userType === USER_TYPE.STORE_OWNER ? 'Create Your Store' : 'Join as a Shopper'}
      </h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-4">
        {userType === USER_TYPE.STORE_OWNER
          ? 'Start your own e-commerce store on EazyAza platform with AI-powered features and global reach.'
          : 'Create your shopper profile and get access to thousands of unique stores worldwide.'
        }
      </p>
      {userType === USER_TYPE.STORE_OWNER && !otpStep ? (
        /* Step 1: Store Owner Registration Form */
        <form className="w-full flex flex-col" onSubmit={handleOtpRequest}>
          <input type="hidden" name="user_type" value={userType} />
          <div className="flex flex-col w-full gap-y-2">
            <Input
              label="Store name"
              name="store_name"
              required
              autoComplete="organization"
              value={storeOwnerFormData.storeName}
              onChange={(e) => updateStoreOwnerField('storeName', e.target.value)}
              data-testid="store-name-input"
            />
            {validationErrors.storeName && <p className="text-rose-500 text-sm">{validationErrors.storeName}</p>}

            <Input
              label="Email"
              name="email"
              required
              type="email"
              autoComplete="email"
              value={storeOwnerFormData.email}
              onChange={(e) => updateStoreOwnerField('email', e.target.value)}
              data-testid="email-input"
            />
            {validationErrors.email && <p className="text-rose-500 text-sm">{validationErrors.email}</p>}

            <Input
              label="Password"
              name="password"
              required
              type="password"
              autoComplete="new-password"
              value={storeOwnerFormData.password}
              onChange={(e) => updateStoreOwnerField('password', e.target.value)}
              data-testid="password-input"
            />
            {validationErrors.password && <p className="text-rose-500 text-sm">{validationErrors.password}</p>}
          </div>
          <ErrorMessage error={otpError} data-testid="otp-error" />
          <span className="text-center text-ui-fg-base text-small-regular mt-6">
            By creating an account, you agree to Medusa Store&apos;s{" "}
            <LocalizedClientLink
              href="/content/privacy-policy"
              className="underline"
            >
              Privacy Policy
            </LocalizedClientLink>{" "}
            and{" "}
            <LocalizedClientLink
              href="/content/terms-of-use"
              className="underline"
            >
              Terms of Use
            </LocalizedClientLink>
            .
          </span>
          <Button
            type="submit"
            className="w-full mt-6"
            size="lg"
            data-testid="send-otp-button"
          >
            Send Verification Code
          </Button>
        </form>
      ) : userType === USER_TYPE.STORE_OWNER && otpStep ? (
        /* Step 2: OTP Verification */
        <form className="w-full flex flex-col" action={handleFinalSubmit}>
          <input type="hidden" name="user_type" value={userType} />
          <div className="mb-4 text-center">
            <p className="text-sm text-gray-600">
              We've sent a verification code to<br />
              <span className="font-medium">{formData?.email}</span>
            </p>
          </div>
          <div className="flex flex-col w-full gap-y-2">
            <Input
              label="Verification Code"
              name="otp"
              required
              maxLength={6}
              autoComplete="one-time-code"
              data-testid="otp-input"
            />
          </div>
          <ErrorMessage error={message} data-testid="register-error" />
          <div className="flex flex-col gap-2 mt-6">
            <Button
              type="submit"
              className="w-full"
              size="lg"
              data-testid="verify-button"
            >
              Create Store Account
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setOtpStep(false)
                setFormData(null)
              }}
              className="text-sm"
            >
              ← Back to form
            </Button>
          </div>
        </form>
      ) : (
        /* Shopper Registration Form */
        <form className="w-full flex flex-col" action={async () => {
          // Validate before submitting
          const errors: Record<string, string> = {}
          const email = shopperFormData.email
          const phone = shopperFormData.phone
          const firstName = shopperFormData.firstName
          const lastName = shopperFormData.lastName
          const password = shopperFormData.password

          if (!firstName) errors.firstName = "First name is required"
          if (!lastName) errors.lastName = "Last name is required"
          if (!email) errors.email = "Email is required"
          else if (!validateEmail(email)) errors.email = "Please enter a valid email address"
          if (phone && !validatePhone(phone)) errors.phone = "Please enter a valid phone number"
          if (!password) errors.password = "Password is required"
          else if (password.length < 6) errors.password = "Password must be at least 6 characters"

          if (Object.keys(errors).length > 0) {
            setValidationErrors(errors)
            return
          }

          // Check if email already exists
          try {
            const emailExists = await checkEmailExists(email)
            if (emailExists) {
              setValidationErrors({ email: "An account with this email already exists. Please sign in instead." })
              return
            }
          } catch (error) {
            console.warn('Email check failed, proceeding with registration')
          }

          setValidationErrors({})
          // Create FormData with current values
          const formDataToSubmit = new FormData()
          formDataToSubmit.set('user_type', userType)
          formDataToSubmit.set('first_name', firstName)
          formDataToSubmit.set('last_name', lastName)
          formDataToSubmit.set('email', email)
          formDataToSubmit.set('phone', phone)
          formDataToSubmit.set('password', password)

          formAction(formDataToSubmit)
        }}>
          <input type="hidden" name="user_type" value={userType} />
          <div className="flex flex-col w-full gap-y-2">
            <Input
              label="First name"
              name="first_name"
              required
              autoComplete="given-name"
              value={shopperFormData.firstName}
              onChange={(e) => updateShopperField('firstName', e.target.value)}
              data-testid="first-name-input"
            />
            {validationErrors.firstName && <p className="text-rose-500 text-sm">{validationErrors.firstName}</p>}

            <Input
              label="Last name"
              name="last_name"
              required
              autoComplete="family-name"
              value={shopperFormData.lastName}
              onChange={(e) => updateShopperField('lastName', e.target.value)}
              data-testid="last-name-input"
            />
            {validationErrors.lastName && <p className="text-rose-500 text-sm">{validationErrors.lastName}</p>}

            <Input
              label="Email"
              name="email"
              required
              type="email"
              autoComplete="email"
              value={shopperFormData.email}
              onChange={(e) => updateShopperField('email', e.target.value)}
              data-testid="email-input"
            />
            {validationErrors.email && <p className="text-rose-500 text-sm">{validationErrors.email}</p>}

            <Input
              label="Phone (optional)"
              name="phone"
              type="tel"
              autoComplete="tel"
              formatInput={true}
              showValidation={true}
              validationMessage="Please enter a valid phone number"
              value={shopperFormData.phone}
              onChange={(e) => updateShopperField('phone', e.target.value)}
              data-testid="phone-input"
            />
            {validationErrors.phone && <p className="text-rose-500 text-sm">{validationErrors.phone}</p>}

            <Input
              label="Password"
              name="password"
              required
              type="password"
              autoComplete="new-password"
              value={shopperFormData.password}
              onChange={(e) => updateShopperField('password', e.target.value)}
              data-testid="password-input"
            />
            {validationErrors.password && <p className="text-rose-500 text-sm">{validationErrors.password}</p>}
          </div>
          <ErrorMessage error={message} data-testid="register-error" />
          <span className="text-center text-ui-fg-base text-small-regular mt-6">
            By creating an account, you agree to Medusa Store&apos;s{" "}
            <LocalizedClientLink
              href="/content/privacy-policy"
              className="underline"
            >
              Privacy Policy
            </LocalizedClientLink>{" "}
            and{" "}
            <LocalizedClientLink
              href="/content/terms-of-use"
              className="underline"
            >
              Terms of Use
            </LocalizedClientLink>
            .
          </span>
          <Button
            type="submit"
            className="w-full mt-6"
            size="lg"
            data-testid="register-button"
          >
            Join as Shopper
          </Button>
        </form>
      )}
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Already a member?{" "}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline p-0 h-auto"
        >
          Sign in
        </Button>
        .
      </span>
    </div>
  )
}

export default Register
