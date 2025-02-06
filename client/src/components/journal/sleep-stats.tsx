import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export function SleepStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sleep Statistics</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Avg. Sleep Duration</p>
          <p className="text-2xl font-bold">7h 30m</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Avg. Bedtime</p>
          <p className="text-2xl font-bold">10:45 PM</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Avg. Wake Time</p>
          <p className="text-2xl font-bold">6:15 AM</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Sleep Quality</p>
          <p className="text-2xl font-bold">Good</p>
        </div>
      </CardContent>
    </Card>
  )
}

