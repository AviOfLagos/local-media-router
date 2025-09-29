"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import {
  getAuthHeaders,
  getCacheOptions,
  getCacheTag,
  getCartId,
  removeAuthToken,
  removeCartId,
  setAuthToken,
} from "./cookies"

export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
    const response = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/customers/check-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(publishableKey && { 'x-publishable-api-key': publishableKey }),
      },
      body: JSON.stringify({ email }),
    })

    if (response.ok) {
      const data = await response.json()
      return data.exists || false
    }

    // If the endpoint doesn't exist, fall back to trying to register
    // which will fail if the email exists (handled in signup function)
    return false
  } catch (error) {
    console.warn('Email check failed, proceeding with registration:', error)
    return false
  }
}

export const generateOtp = async (email: string) => {
  try {
    // Check if email already exists before generating OTP
    const emailExists = await checkEmailExists(email)
    if (emailExists) {
      throw new Error('An account with this email already exists. Please sign in instead.')
    }

    const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
    console.log('Backend URL:', backendUrl)

    const response = await fetch(`${backendUrl}/store/otp/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(publishableKey && { 'x-publishable-api-key': publishableKey }),
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to generate OTP')
    }

    return await response.json()
  } catch (error: any) {
    throw new Error(error.message || 'Failed to generate OTP')
  }
}

export const retrieveCustomer =
  async (): Promise<HttpTypes.StoreCustomer | null> => {
    const authHeaders = await getAuthHeaders()

    if (!authHeaders) return null

    const headers = {
      ...authHeaders,
    }

    const next = {
      ...(await getCacheOptions("customers")),
    }

    return await sdk.client
      .fetch<{ customer: HttpTypes.StoreCustomer }>(`/store/customers/me`, {
        method: "GET",
        query: {
          fields: "*orders",
        },
        headers,
        next,
        cache: "force-cache",
      })
      .then(({ customer }) => customer)
      .catch(() => null)
  }

export const updateCustomer = async (body: HttpTypes.StoreUpdateCustomer) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const updateRes = await sdk.store.customer
    .update(body, {}, headers)
    .then(({ customer }) => customer)
    .catch(medusaError)

  const cacheTag = await getCacheTag("customers")
  revalidateTag(cacheTag)

  return updateRes
}

export async function signup(_currentState: unknown, formData: FormData) {
  const password = formData.get("password") as string
  const userType = formData.get("user_type") as string
  const storeName = formData.get("store_name") as string
  const otp = formData.get("otp") as string

  // Simplified forms based on user type (per marketplace_user_flow.md)
  const customerForm = userType === "store-owner"
    ? {
        // Store owners: simplified to email only, will auto-generate name from store
        email: formData.get("email") as string,
        first_name: storeName?.split(' ')[0] || 'Store',
        last_name: storeName?.split(' ').slice(1).join(' ') || 'Owner',
        phone: '', // Optional for store owners initially
      }
    : {
        // Shoppers: full details
        email: formData.get("email") as string,
        first_name: formData.get("first_name") as string,
        last_name: formData.get("last_name") as string,
        phone: formData.get("phone") as string,
      }

  try {
    // For store owners, verify OTP before proceeding
    if (userType === "store-owner" && otp) {
      const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
      const otpResponse = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/otp/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(publishableKey && { 'x-publishable-api-key': publishableKey }),
        },
        body: JSON.stringify({
          email: customerForm.email,
          otp: otp,
        }),
      })

      if (!otpResponse.ok) {
        const errorData = await otpResponse.json()
        return errorData.error || "OTP verification failed"
      }
    }

    // Register the user with Medusa auth
    const token = await sdk.auth.register("customer", "emailpass", {
      email: customerForm.email,
      password: password,
    })

    await setAuthToken(token as string)

    const headers = {
      ...(await getAuthHeaders()),
    }

    // Create customer profile
    const { customer: createdCustomer } = await sdk.store.customer.create(
      customerForm,
      {},
      headers
    )

    // If this is a store owner, create their tenant store
    if (userType === "store-owner" && storeName) {
      try {
        // Create a slug from store name
        const subdomain = storeName
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '')
          .substring(0, 50)

        // Call our tenant creation API (we'll create this)
        const tenantResponse = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/tenants`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          body: JSON.stringify({
            subdomain: subdomain,
            name: storeName,
            owner_email: customerForm.email,
            owner_id: createdCustomer.id,
            description: `${storeName} - Powered by EazyAza`,
            theme_config: {
              primaryColor: '#3B82F6',
              secondaryColor: '#1F2937',
              fontFamily: 'Inter',
              logoPosition: 'left'
            },
            default_currency: 'USD',
            supported_regions: ['us'],
            ai_config: {
              brandVoice: 'professional',
              industry: 'general',
              contentTone: 'friendly'
            }
          })
        })

        if (tenantResponse.ok) {
          console.log(`Created tenant store: ${subdomain}`)
        } else {
          console.warn(`Failed to create tenant store: ${tenantResponse.status}`)
        }
      } catch (tenantError) {
        console.warn('Failed to create tenant store:', tenantError)
        // Don't fail the whole signup process if tenant creation fails
      }
    }

    // Login the user
    const loginToken = await sdk.auth.login("customer", "emailpass", {
      email: customerForm.email,
      password,
    })

    await setAuthToken(loginToken as string)

    const customerCacheTag = await getCacheTag("customers")
    revalidateTag(customerCacheTag)

    await transferCart()

    // For store owners, redirect to their dashboard after successful registration
    if (userType === "store-owner") {
      // Store owner registered successfully, redirect to store owner dashboard
      return { success: true, redirectTo: '/store-owner-dashboard', customer: createdCustomer }
    }

    // For shoppers, redirect to their dashboard
    return { success: true, redirectTo: '/shopper-dashboard', customer: createdCustomer }
  } catch (error: any) {
    return error.toString()
  }
}

export async function login(_currentState: unknown, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    await sdk.auth
      .login("customer", "emailpass", { email, password })
      .then(async (token) => {
        await setAuthToken(token as string)
        const customerCacheTag = await getCacheTag("customers")
        revalidateTag(customerCacheTag)
      })
  } catch (error: any) {
    return error.toString()
  }

  try {
    await transferCart()
  } catch (error: any) {
    return error.toString()
  }

  // After successful login, determine user type and redirect appropriately
  try {
    const customer = await retrieveCustomer()
    if (customer) {
      // TODO: Once we have tenant system, determine if user is store owner
      // For now, we'll use a simple heuristic or default behavior

      // Check if user has any stores (indicates store owner)
      // This is a temporary solution until proper tenant relationships are implemented
      const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'
      const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

      try {
        const storeCheckResponse = await fetch(`${backendUrl}/store/user-stores`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(publishableKey && { 'x-publishable-api-key': publishableKey }),
          },
          body: JSON.stringify({ email: customer.email }),
        })

        if (storeCheckResponse.ok) {
          const storeData = await storeCheckResponse.json()
          if (storeData.isStoreOwner) {
            return { success: true, redirectTo: '/store-owner-dashboard', customer }
          }
        }
      } catch (error) {
        console.warn('Store owner check failed, defaulting to shopper dashboard')
      }

      // Default to shopper dashboard
      return { success: true, redirectTo: '/shopper-dashboard', customer }
    }
  } catch (error) {
    console.warn('Customer retrieval failed after login:', error)
  }
}

export async function signout(countryCode: string) {
  await sdk.auth.logout()

  await removeAuthToken()

  const customerCacheTag = await getCacheTag("customers")
  revalidateTag(customerCacheTag)

  await removeCartId()

  const cartCacheTag = await getCacheTag("carts")
  revalidateTag(cartCacheTag)

  redirect(`/${countryCode}/account`)
}

export async function transferCart() {
  const cartId = await getCartId()

  if (!cartId) {
    return
  }

  const headers = await getAuthHeaders()

  await sdk.store.cart.transferCart(cartId, {}, headers)

  const cartCacheTag = await getCacheTag("carts")
  revalidateTag(cartCacheTag)
}

export const addCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData
): Promise<any> => {
  const isDefaultBilling = (currentState.isDefaultBilling as boolean) || false
  const isDefaultShipping = (currentState.isDefaultShipping as boolean) || false

  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    company: formData.get("company") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
    phone: formData.get("phone") as string,
    is_default_billing: isDefaultBilling,
    is_default_shipping: isDefaultShipping,
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.customer
    .createAddress(address, {}, headers)
    .then(async ({ customer }) => {
      const customerCacheTag = await getCacheTag("customers")
      revalidateTag(customerCacheTag)
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export const deleteCustomerAddress = async (
  addressId: string
): Promise<void> => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  await sdk.store.customer
    .deleteAddress(addressId, headers)
    .then(async () => {
      const customerCacheTag = await getCacheTag("customers")
      revalidateTag(customerCacheTag)
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export const updateCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData
): Promise<any> => {
  const addressId =
    (currentState.addressId as string) || (formData.get("addressId") as string)

  if (!addressId) {
    return { success: false, error: "Address ID is required" }
  }

  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    company: formData.get("company") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
  } as HttpTypes.StoreUpdateCustomerAddress

  const phone = formData.get("phone") as string

  if (phone) {
    address.phone = phone
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.customer
    .updateAddress(addressId, address, {}, headers)
    .then(async () => {
      const customerCacheTag = await getCacheTag("customers")
      revalidateTag(customerCacheTag)
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}
