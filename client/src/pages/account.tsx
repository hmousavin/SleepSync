import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

import { Button } from "../components/ui/button"
import * as auth from "../services/auth"
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";

export default function AccountPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSignOut = async () => {
    try {
      await auth.logout()
      navigate("/onboarding")
    } catch (error) {
      // toast({
      //   title: "Error!",
      //   description: "failed to sign out! please try again",
      // });
    }
  }

  return (
    <div className="space-y-6 p-4 pb-20">
      <h1 className="text-3xl font-bold">Account</h1>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-medium">John Doe</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">john.doe@example.com</p>
          </div>
          <Button variant="outline" className="w-full">
            Edit Profile
          </Button>
          <Button variant="outline" className="w-full">
            Change Password
          </Button>
          <Button variant="destructive" className="w-full" onClick={() => handleSignOut()}>
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}