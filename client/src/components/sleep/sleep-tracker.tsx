import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Moon, Sun } from "lucide-react"

export function SleepTracker() {
  const [isSleeping, setIsSleeping] = useState(false)
  const [startTime, setStartTime] = useState<Date | null>(null)

  const handleSleepToggle = () => {
    if (isSleeping) {
      setIsSleeping(false)
      setStartTime(null)
    } else {
      setIsSleeping(true)
      setStartTime(new Date())
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sleep Tracker</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {isSleeping ? (
          <>
            <Sun className="h-16 w-16 text-primary mb-4" />
            <p className="text-2xl font-bold mb-2">Sleep in progress</p>
            <p className="text-muted-foreground mb-4">Started at {startTime?.toLocaleTimeString()}</p>
            <Button onClick={handleSleepToggle} variant="destructive">
              End Sleep
            </Button>
          </>
        ) : (
          <>
            <Moon className="h-16 w-16 text-primary mb-4" />
            <p className="text-2xl font-bold mb-4">Ready to sleep?</p>
            <Button onClick={handleSleepToggle}>Start Sleep</Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}

