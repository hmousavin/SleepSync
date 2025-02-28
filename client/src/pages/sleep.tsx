import { SleepTracker } from "../components/sleep/sleep-tracker"

export default function SleepPage() {
  return (
    <div className="space-y-6 p-4 pb-20">
      <h1 className="text-3xl font-bold">Sleep</h1>
      <SleepTracker />
    </div>
  )
}

