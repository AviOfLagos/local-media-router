import { Label } from "@medusajs/ui"
import React, { useEffect, useImperativeHandle, useState } from "react"

import Eye from "@modules/common/icons/eye"
import EyeOff from "@modules/common/icons/eye-off"

// Input formatting helpers
const formatPhoneNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, '')
  if (cleaned.length === 0) return ''
  if (cleaned.length <= 3) return cleaned
  if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
}

const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const validatePhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length >= 7 && cleaned.length <= 15
}

type InputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
  "placeholder"
> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
  topLabel?: string
  formatInput?: boolean // Enable auto-formatting for phone numbers
  showValidation?: boolean // Show real-time validation
  validationMessage?: string // Custom validation message
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, touched, required, topLabel, formatInput = false, showValidation = false, validationMessage, onChange, value, defaultValue, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(() => {
      if (type === "password") return "password"
      return type || "text"
    })
    const [internalValue, setInternalValue] = useState(defaultValue || '')
    const [isValid, setIsValid] = useState(true)
    const [validationMsg, setValidationMsg] = useState('')

    // Determine if this is a controlled component
    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalValue

    // Use simple mode if no enhanced features are requested
    const useSimpleMode = !formatInput && !showValidation && !isControlled


    useEffect(() => {
      if (type === "password") {
        setInputType(showPassword ? "text" : "password")
      } else {
        // Explicitly set the type for non-password inputs
        setInputType(type || "text")
      }
    }, [type, showPassword])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        let newValue = e.target.value

        // Format phone numbers (only if formatInput is enabled)
        if (formatInput && type === "tel") {
          newValue = formatPhoneNumber(newValue)
        }

        // Update internal state only if uncontrolled
        if (!isControlled) {
          setInternalValue(newValue)
        }

        // Real-time validation (only if showValidation is enabled)
        if (showValidation) {
          if (type === "email") {
            const valid = !newValue || validateEmail(newValue)
            setIsValid(valid)
            setValidationMsg(valid ? '' : validationMessage || 'Please enter a valid email address')
          } else if (type === "tel" && newValue) {
            const valid = validatePhone(newValue)
            setIsValid(valid)
            setValidationMsg(valid ? '' : validationMessage || 'Please enter a valid phone number')
          } else if (required && !newValue) {
            setIsValid(false)
            setValidationMsg(validationMessage || 'This field is required')
          } else {
            setIsValid(true)
            setValidationMsg('')
          }
        }

        // Always call original onChange if provided
        if (onChange) {
          // For controlled components, create a new event with formatted value
          const syntheticEvent = {
            ...e,
            target: {
              ...e.target,
              value: newValue
            }
          } as React.ChangeEvent<HTMLInputElement>
          onChange(syntheticEvent)
        }
      } catch (error) {
        console.error('Input handleChange error:', error)
        // Fallback to original onChange
        if (onChange) {
          onChange(e)
        }
      }
    }

    useImperativeHandle(ref, () => inputRef.current!)

    return (
      <div className="flex flex-col w-full">
        {topLabel && (
          <Label className="mb-2 txt-compact-medium-plus">{topLabel}</Label>
        )}
        <div className="flex relative z-0 w-full txt-compact-medium">
          <input
            type={inputType}
            name={name}
            {...(useSimpleMode ? {} : { value: currentValue })}
            placeholder=""
            required={required}
            className={`pt-4 pb-1 block w-full h-11 px-4 mt-0 bg-ui-bg-field border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active hover:bg-ui-bg-field-hover text-ui-fg-base transition-colors ${
              showValidation && !isValid ? 'border-red-500 focus:border-red-500' : 'border-ui-border-base focus:border-blue-500'
            }`}
            onChange={useSimpleMode ? onChange : handleInputChange}
            {...props}
            ref={inputRef}
          />
          <label
            htmlFor={name}
            onClick={() => inputRef.current?.focus()}
            className="flex items-center justify-center mx-3 px-1 transition-all absolute duration-300 top-3 z-10 origin-0 text-ui-fg-subtle bg-ui-bg-field pointer-events-none"
          >
            {label}
            {required && <span className="text-rose-500">*</span>}
          </label>
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-ui-fg-subtle px-4 focus:outline-none transition-all duration-150 outline-none focus:text-ui-fg-base absolute right-0 top-3"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
        {showValidation && validationMsg && (
          <p className="mt-1 text-sm text-red-600">{validationMsg}</p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
