import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { AlarmClock, Music, Moon, BarChart } from "lucide-react"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <a href="/sleep">
          <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center">
            <AlarmClock className="h-6 w-6 mb-2" />
            <span className="text-xs">Alarms</span>
          </Button>
        </a>
        <a href="/sleep">
          <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center">
            <Music className="h-6 w-6 mb-2" />
            <span className="text-xs">Sleep Sounds</span>
          </Button>
        </a>
        <a href="/sleep">
          <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center">
            <Moon className="h-6 w-6 mb-2" />
            <span className="text-xs">Sleep Now</span>
          </Button>
        </a>
        <a href="/journal">
          <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center">
            <BarChart className="h-6 w-6 mb-2" />
            <span className="text-xs">Sleep Journal</span>
          </Button>
        </a>
      </CardContent>
    </Card>
  )
}

