import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Icons } from "../icons"
import { useToast } from "../ui/use-toast"
import { useNavigate } from "react-router-dom"
import useAuthStore from "../../store/AuthStore";
import * as auth from "../../services/auth"

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  })
  const { toast } = useToast();
  const { login } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const response = await auth.register(form)
      login(response.token)
      toast({
        title: "Success!",
        description: response.message,
      })
      navigate("/")
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to create account. Please try again.",
      });
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="fullname" placeholder="John Doe" type="text" disabled={isLoading} required onChange={handleChange}/>
      </div>
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
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" disabled={isLoading} required onChange={handleChange}/>
      </div>
      <Button className="w-full" type="submit" disabled={isLoading}>
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Create Account
      </Button>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/sign-in" className="text-primary hover:underline">
          Sign in
        </a>
      </div>
    </form>
  )
}