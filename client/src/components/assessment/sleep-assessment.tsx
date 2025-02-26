import { useState } from "react"

import QuestionSlide from "./question-slide"
import type { Question, AssessmentState } from "../../types"
import { useNavigate } from "react-router-dom"

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "How would you describe your typical sleep duration on weekdays?",
    options: [
      { emoji: "😴", text: "Less than 6 hours", value: "less_than_6" },
      { emoji: "😊", text: "6 - 7 hours", value: "6_7" },
      { emoji: "🙂", text: "7 - 8 hours", value: "7_8" },
      { emoji: "🤤", text: "More than 8 hours", value: "more_than_8" },
    ],
  },
  {
    id: 2,
    text: "How would you describe your typical sleep duration on weekends?",
    options: [
      { emoji: "😴", text: "Less than 6 hours", value: "less_than_6" },
      { emoji: "😊", text: "6 - 7 hours", value: "6_7" },
      { emoji: "🙂", text: "7 - 8 hours", value: "7_8" },
      { emoji: "🤤", text: "More than 8 hours", value: "more_than_8" },
    ],
  },
  {
    id: 3,
    text: "How would you rate the quality of your sleep overall?",
    options: [
      { emoji: "🥺", text: "Poor", value: "poor" },
      { emoji: "🙂", text: "Fair", value: "fair" },
      { emoji: "☺️", text: "Good", value: "good" },
      { emoji: "🤤", text: "Excellent", value: "excellent" },
    ],
  },
  {
    id: 4,
    text: "How often do you experience difficulty falling asleep?",
    options: [
      { emoji: "😣", text: "Almost every night", value: "almost_every_night" },
      { emoji: "😕", text: "A few nights a week", value: "few_nights" },
      { emoji: "🙂", text: "Occasionally", value: "occasionally" },
      { emoji: "😎", text: "Rarely or never", value: "rarely" },
    ],
  },
  {
    id: 5,
    text: "How often do you wake up during the night?",
    options: [
      { emoji: "😣", text: "Almost every night", value: "almost_every_night" },
      { emoji: "🤤", text: "A few nights a week", value: "few_nights" },
      { emoji: "🙂", text: "Occasionally", value: "occasionally" },
      { emoji: "😎", text: "Rarely or never", value: "rarely" },
    ],
  },
  {
    id: 6,
    text: "Do you typically feel refreshed and well-rested upon waking up in the morning?",
    options: [
      { emoji: "🥴", text: "Rarely or never", value: "rarely" },
      { emoji: "😕", text: "Occasionally", value: "occasionally" },
      { emoji: "☺️", text: "Most of the time", value: "most_times" },
      { emoji: "🤤", text: "Always", value: "always" },
    ],
  },
  {
    id: 7,
    text: "Do you have a consistent bedtime routine?",
    options: [
      { emoji: "😊", text: "Yes, every night", value: "every_night" },
      { emoji: "🙂", text: "Most nights", value: "most_nights" },
      { emoji: "🤤", text: "Occasionally", value: "occasionally" },
      { emoji: "🥺", text: "No, rarely or never", value: "rarely" },
    ],
  },
  {
    id: 8,
    text: "Do you consume caffeine or alcohol close to bedtime?",
    options: [
      { emoji: "😣", text: "Yes, regularly", value: "regularly" },
      { emoji: "🤤", text: "Occasionally", value: "occasionally" },
      { emoji: "🙂", text: "Rarely", value: "rarely" },
      { emoji: "😎", text: "Never", value: "never" },
    ],
  },
  {
    id: 9,
    text: "Do you use electronic devices before bedtime?",
    options: [
      { emoji: "🥺", text: "Yes, regularly", value: "regularly" },
      { emoji: "🤤", text: "Occasionally", value: "occasionally" },
      { emoji: "🙂", text: "Rarely", value: "rarely" },
      { emoji: "😎", text: "Never", value: "never" },
    ],
  },
  {
    id: 10,
    text: "How would you rate your stress levels before bedtime?",
    options: [
      { emoji: "😣", text: "High", value: "high" },
      { emoji: "🥺", text: "Moderate", value: "moderate" },
      { emoji: "😊", text: "Low", value: "low" },
      { emoji: "🤤", text: "None", value: "none" },
    ],
  },
]

export default function SleepAssessment() {
  const [state, setState] = useState<AssessmentState>({
    currentQuestion: 1,
    answers: {},
  })
  const [isEnable, setIsEnable] = useState(false)
  const navigate = useNavigate();

  const currentQuestion = QUESTIONS.find((q) => q.id === state.currentQuestion)

  const handleAnswer = (value: string) => {
    setIsEnable(true)
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [state.currentQuestion]: value },
    }))
  }

  const handleBack = () => {
    if (state.currentQuestion > 1) {
      setState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
      }))
    }
    setIsEnable(!!state.answers[state.currentQuestion - 1])
  }

  const handleContinue = () => {
    if (state.currentQuestion < QUESTIONS.length) {
      setState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }))
      setIsEnable(false)
    } else {
      console.log("Assessment completed:", state.answers)
      navigate("/")
    }
  }

  if (!currentQuestion) return null

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <QuestionSlide
          question={currentQuestion}
          currentAnswer={state.answers[state.currentQuestion] || ""}
          totalQuestions={QUESTIONS.length}
          onAnswer={handleAnswer}
          onBack={handleBack}
          onContinue={handleContinue}
          isEnable={isEnable}
          isLast={state.currentQuestion === QUESTIONS.length}
        />
    </div>
  )
}

