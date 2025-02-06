import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Moon, Sun } from "lucide-react"

export function SleepSchedule() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sleep Schedule</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div className="flex items-center">
          <Moon className="h-5 w-5 mr-2 text-primary" />
          <div>
            <p className="font-semibold">10:30 PM</p>
            <p className="text-sm text-muted-foreground">Bedtime</p>
          </div>
        </div>
        <div className="flex items-center">
          <Sun className="h-5 w-5 mr-2 text-primary" />
          <div>
            <p className="font-semibold">6:30 AM</p>
            <p className="text-sm text-muted-foreground">Wake up</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Change
        </Button>
      </CardContent>
    </Card>
  )
}

