"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { day: "Mon", hours: 7 },
  { day: "Tue", hours: 6.5 },
  { day: "Wed", hours: 8 },
  { day: "Thu", hours: 7.5 },
  { day: "Fri", hours: 6 },
  { day: "Sat", hours: 9 },
  { day: "Sun", hours: 8.5 },
]

export function SleepChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Sleep Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="hours" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

