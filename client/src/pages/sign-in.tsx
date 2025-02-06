import { SignInForm } from "../components/auth/sign-in-form"
import { AuthLayout } from "../components/auth/auth-layout"

export default function SignInPage() {
  return (
    <AuthLayout title="Welcome back" subtitle="Enter your email to sign in to your account">
      <SignInForm />
    </AuthLayout>
  )
}

