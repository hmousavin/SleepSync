import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import useAuthStore from "../store/AuthStore";
import { Moon } from "lucide-react"

export default function OnboardingPage() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const navigate = useNavigate();
    
    return (
        !isAuthenticated &&
        <div className="min-h-screen bg-background p-6 flex flex-col">
            {/* Status Bar Space */}
            <div className="h-6" />

            <main className="flex-1 flex flex-col items-center">
                {/* Logo */}
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                <Moon className="w-8 h-8 text-white transform rotate-12" />
                </div>

                {/* Heading */}
                <h1 className="text-2xl font-bold mb-2">Let's Get Started!</h1>
                <p className="text-muted-foreground mb-8">Let's dive in into your account</p>

                {/* Social Login Buttons */}
                <div className="w-full space-y-3 mb-6">
                <Button className="w-full flex items-center justify-center gap-3 px-4 py-3 border rounded-lg hover:bg-accent">
                    <img src="/google.svg" alt="" className="w-5 h-5" />
                    <span>Continue with Google</span>
                </Button>

                <Button className="w-full flex items-center justify-center gap-3 px-4 py-3 border rounded-lg hover:bg-accent">
                    <img src="/apple.svg" alt="" className="w-5 h-5" />
                    <span>Continue with Apple</span>
                </Button>

                <Button className="w-full flex items-center justify-center gap-3 px-4 py-3 border rounded-lg hover:bg-accent">
                    <img src="/facebook.svg" alt="" className="w-5 h-5" />
                    <span>Continue with Facebook</span>
                </Button>

                <Button className="w-full flex items-center justify-center gap-3 px-4 py-3 border rounded-lg hover:bg-accent">
                    <img src="/twitter.svg" alt="" className="w-5 h-5" />
                    <span>Continue with Twitter</span>
                </Button>
                </div>

                {/* Sign up & Sign in Buttons */}
                <Button className="w-full bg-primary text-primary-foreground py-3 rounded-lg mb-3 hover:bg-primary/90"  onClick={() => navigate("/sign-up")}>
                    Sign up
                </Button>
                <Button className="w-full bg-secondary text-secondary-foreground py-3 rounded-lg hover:bg-secondary/90" onClick={() => navigate("/sign-in")}>
                    Sign in
                </Button>

                {/* Footer Links */}
                <div className="pt-6 flex gap-4 text-sm text-muted-foreground">
                    <a href="#" className="hover:text-foreground">
                        Privacy Policy
                    </a>
                    <a href="#" className="hover:text-foreground">
                        Terms of Service
                    </a>
                </div>
            </main>
        </div>        
    )
}