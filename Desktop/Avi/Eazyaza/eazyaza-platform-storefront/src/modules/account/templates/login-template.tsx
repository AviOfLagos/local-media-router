"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

export enum USER_TYPE {
  SHOPPER = "shopper",
  STORE_OWNER = "store-owner",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in")
  const [userType, setUserType] = useState<USER_TYPE>(USER_TYPE.SHOPPER)
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if we should show signup flow and what type
    const signupType = searchParams.get('signup')
    if (signupType) {
      setCurrentView("register")
      setUserType(signupType === 'store-owner' ? USER_TYPE.STORE_OWNER : USER_TYPE.SHOPPER)
    }
  }, [searchParams])

  return (
    <div className="w-full flex justify-start px-8 py-8">
      {currentView === "sign-in" ? (
        <Login setCurrentView={setCurrentView} userType={userType} setUserType={setUserType} />
      ) : (
        <Register setCurrentView={setCurrentView} userType={userType} setUserType={setUserType} />
      )}
    </div>
  )
}

export default LoginTemplate
