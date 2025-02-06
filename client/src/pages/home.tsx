import { SleepScheduleClock } from "../components/home/sleep-schedule-clock"
import { BedtimeReminder } from "../components/home/bedtime-reminder"
import { QuickActions } from "../components/home/quick-actions"

export default function HomePage() {
  return (
    <div className="space-y-6 p-4 pb-20">
      <h1 className="text-3xl font-bold">Good evening, User</h1>
      <SleepScheduleClock />
      <BedtimeReminder />
      <QuickActions />
    </div>
  )
}

