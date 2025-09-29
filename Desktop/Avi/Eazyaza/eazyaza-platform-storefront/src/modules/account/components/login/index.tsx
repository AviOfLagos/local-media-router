import { login } from "@lib/data/customer"
import { LOGIN_VIEW, USER_TYPE } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import Button from "@modules/common/components/button"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
  userType: USER_TYPE
  setUserType: (type: USER_TYPE) => void
}

const Login = ({ setCurrentView, userType, setUserType }: Props) => {
  const router = useRouter()
  const [message, formAction] = useActionState(login, null)

  // Handle redirect after successful login
  useEffect(() => {
    if (message && typeof message === 'object' && 'success' in message && message.success && message.redirectTo) {
      router.push(message.redirectTo)
    }
  }, [message, router])

  return (
    <div
      className="max-w-sm w-full flex flex-col items-center"
      data-testid="login-page"
    >
      <h1 className="text-large-semi uppercase mb-6">Welcome back</h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-8">
        Sign in to access an enhanced shopping experience.
      </p>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            showValidation={true}
            validationMessage="Please enter a valid email address"
            required
            data-testid="email-input"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="login-error-message" />
        <Button type="submit" data-testid="sign-in-button" className="w-full mt-6" size="lg">
          Sign in
        </Button>
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Not a member?{" "}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline p-0 h-auto"
          data-testid="register-button"
        >
          Join us
        </Button>
        .
      </span>

      {/* User Type Toggle for Signup */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-center text-small-regular text-ui-fg-base mb-3">
          Want to create a store instead?
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setUserType(USER_TYPE.STORE_OWNER);
            setCurrentView(LOGIN_VIEW.REGISTER);
          }}
          className="w-full"
        >
          🏪 Sign up as Store Owner
        </Button>
      </div>
    </div>
  )
}

export default Login
