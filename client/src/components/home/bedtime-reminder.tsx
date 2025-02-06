import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Switch } from "../ui/switch"
import { Bell } from "lucide-react"

export function BedtimeReminder() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bedtime Reminder</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div className="flex items-center">
          <Bell className="h-5 w-5 mr-2 text-primary" />
          <div>
            <p className="font-semibold">10:00 PM</p>
            <p className="text-sm text-muted-foreground">30 minutes before bedtime</p>
          </div>
        </div>
        <Switch />
      </CardContent>
    </Card>
  )
}

