import { SleepScheduleClock } from "../components/home/sleep-schedule-clock"

export default function HomePage() {
  return (
    <div className="space-y-6 p-4 pb-20">
      <h1 className="text-3xl font-bold">Good evening, User</h1>
      <SleepScheduleClock />
    </div>
  )
}