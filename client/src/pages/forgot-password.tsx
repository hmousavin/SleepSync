import { ForgotPasswordForm } from "../components/auth/forgot-password-form"
import { AuthLayout } from "../components/auth/auth-layout"

export default function ForgotPasswordPage() {
  return (
    <AuthLayout title="Forgot password" subtitle="Enter your email and we'll send you a reset link">
      <ForgotPasswordForm />
    </AuthLayout>
  )
}

