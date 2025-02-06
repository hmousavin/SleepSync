import { SleepTracker } from "../components/sleep/sleep-tracker"
import { AlarmSetup } from "../components/sleep/alarm-setup"
import { SleepSounds } from "../components/sleep/sleep-sounds"

export default function SleepPage() {
  return (
    <div className="space-y-6 p-4 pb-20">
      <h1 className="text-3xl font-bold">Sleep</h1>
      <SleepTracker />
      <AlarmSetup />
      <SleepSounds />
    </div>
  )
}

