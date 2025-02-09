import { useState } from "react"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { Moon, Sun, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"

interface TimePickerProps {
  value: string
  onChange: (value: string) => void
  title: string
}

function TimePicker({ value, onChange, title }: TimePickerProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"))

  const [currentHour, currentMinute] = value.split(":")

  return (
    <div className="p-4">
      <h3 className="text-center mb-4">{title}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-[200px] overflow-y-auto snap-y">
          {hours.map((hour) => (
            <div
              key={hour}
              className={`h-10 flex items-center justify-center snap-center ${
                hour === currentHour ? "text-primary text-lg font-bold" : ""
              }`}
              onClick={() => onChange(`${hour}:${currentMinute}`)}
            >
              {hour}
            </div>
          ))}
        </div>
        <div className="h-[200px] overflow-y-auto snap-y">
          {minutes.map((minute) => (
            <div
              key={minute}
              className={`h-10 flex items-center justify-center snap-center ${
                minute === currentMinute ? "text-primary text-lg font-bold" : ""
              }`}
              onClick={() => onChange(`${currentHour}:${minute}`)}
            >
              {minute}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function SleepScheduleClock() {
  const [bedtime, setBedtime] = useState("22:30")
  const [wakeTime, setWakeTime] = useState("06:00")
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false)
  const [activeTime, setActiveTime] = useState<"bedtime" | "wake">("bedtime")

  const calculateDuration = () => {
    const [bedHour, bedMinute] = bedtime.split(":").map(Number)
    const [wakeHour, wakeMinute] = wakeTime.split(":").map(Number)

    let hours = wakeHour - bedHour
    let minutes = wakeMinute - bedMinute

    if (hours < 0) hours += 24
    if (minutes < 0) {
      hours -= 1
      minutes += 60
    }

    return `${hours}h ${minutes}m`
  }

  const handleTimeClick = (type: "bedtime" | "wake") => {
    setActiveTime(type)
    setIsTimePickerOpen(true)
  }

  const handleTimeChange = (value: string) => {
    if (activeTime === "bedtime") {
      setBedtime(value)
    } else {
      setWakeTime(value)
    }
  }

  return (
    <div className="relative">
      <Card className="bg-background">
        <CardContent className="p-6">
          <div className="relative aspect-square">
            {/* Circular progress background */}
            <div className="absolute inset-0 rounded-full border-4 border-gray-100" />

            {/* Sleep duration display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold">{calculateDuration()}</span>
              <span className="text-sm text-muted-foreground">sleep duration</span>
            </div>

            {/* Time displays */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 py-6">
              <Button
                variant="ghost"
                className="flex flex-col items-start gap-1"
                onClick={() => handleTimeClick("bedtime")}
              >
                <div className="flex items-center gap-2">
                  <Moon className="h-4 w-4 text-primary" />
                  <span>Bedtime</span>
                </div>
                <span className="text-xl font-bold">{bedtime}</span>
              </Button>

              <Button variant="ghost" className="flex flex-col items-end gap-1" onClick={() => handleTimeClick("wake")}>
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-yellow-500" />
                  <span>Alarm</span>
                </div>
                <span className="text-xl font-bold">{wakeTime}</span>
              </Button>
            </div>
          </div>

          {/* Additional settings */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <span>Alarm Sound</span>
              <Button variant="ghost" className="flex items-center gap-2">
                Sunrise Serenade
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span>Repeat</span>
              <Button variant="ghost" className="flex items-center gap-2">
                Everyday
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button className="w-full mt-6" size="lg">
            Sleep Now
          </Button>
        </CardContent>
      </Card>

      <Dialog open={isTimePickerOpen} onOpenChange={setIsTimePickerOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{activeTime === "bedtime" ? "Set Bedtime" : "Set Alarm"}</DialogTitle>
          </DialogHeader>
          <TimePicker
            value={activeTime === "bedtime" ? bedtime : wakeTime}
            onChange={handleTimeChange}
            title={activeTime === "bedtime" ? "Bedtime" : "Alarm"}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

