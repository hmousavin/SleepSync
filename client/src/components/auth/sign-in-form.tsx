import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Icons } from "../icons"
import { useToast } from "../ui/use-toast"
import { useNavigate } from "react-router-dom"
import useAuthStore from "../../store/AuthStore";
import * as auth from "../../services/auth"

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }
  
  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const response = await auth.login(form)
      await login(response.token)
      // toast({
      //   title: "Success!",
      //   description: response.message,
      // })
      navigate("/")
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to create account. Please try again.",
      });
    } finally {
      setIsLoading(false)
    }

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email"
          placeholder="m@example.com"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          disabled={isLoading}
          required
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <a href="/forgot-password" className="text-sm text-primary hover:underline">
            Forgot password?
          </a>
        </div>
        <Input id="password" type="password" disabled={isLoading} required onChange={handleChange}/>
      </div>
      <Button className="w-full" type="submit" disabled={isLoading}>
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Sign In
      </Button>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/sign-up" className="text-primary hover:underline">
          Sign up
        </a>
      </div>
    </form>
  )
}