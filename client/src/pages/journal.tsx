import { SleepStats } from "../components/journal/sleep-stats"
import { SleepChart } from "../components/journal/sleep-chart"

export default function JournalPage() {
  return (
    <div className="space-y-6 p-4 pb-20">
      <h1 className="text-3xl font-bold">Sleep Journal</h1>
      <SleepStats />
      <SleepChart />
    </div>
  )
}

