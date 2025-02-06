import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Switch } from "../ui/switch"
import { AlarmClock } from "lucide-react"

export function AlarmSetup() {
  const [alarm, setAlarm] = useState({
    time: "06:30",
    isActive: true,
  })

  const toggleAlarm = () => {
    setAlarm((prev) => ({ ...prev, isActive: !prev.isActive }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wake-up Alarm</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlarmClock className="h-5 w-5 mr-2 text-primary" />
            <span className="text-lg font-semibold">{alarm.time}</span>
          </div>
          <Switch checked={alarm.isActive} onCheckedChange={toggleAlarm} />
        </div>
      </CardContent>
    </Card>
  )
}

