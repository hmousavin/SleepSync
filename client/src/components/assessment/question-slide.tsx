import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import type { Question } from "../../types"

interface QuestionSlideProps {
  question: Question
  currentAnswer: string
  totalQuestions: number
  onAnswer: (value: string) => void
  onBack: () => void
  onContinue: () => void
  isEnable?: boolean
  isLast?: boolean
}

export default function QuestionSlide({
  question,
  currentAnswer,
  totalQuestions,
  onAnswer,
  onBack,
  onContinue,
  isEnable = false,
  isLast = false,
}: QuestionSlideProps) {
  return (
    <div className="flex flex-col h-full bg-white px-6 py-4">
      <div className="flex items-center mb-8">
        <button onClick={onBack} className="text-gray-600">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-1">
            <div className="h-1 w-16 rounded bg-indigo-600" />
            <span className="text-sm text-gray-500">
              {question.id} / {totalQuestions}
            </span>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-center mb-8">{question.text}</h2>

      <div className="flex-1">
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => onAnswer(option.value)}
              className={`w-full p-4 flex items-center gap-3 rounded-lg border transition-colors
                ${
                  currentAnswer === option.value ? "border-indigo-600 bg-indigo-50" : "border-gray-200 hover:bg-gray-50"
                }`}
            >
              <span className="text-2xl">{option.emoji}</span>
              <span className="text-gray-700">{option.text}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onContinue}
        disabled={!isEnable}
        className="w-full py-3 px-4 mt-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        {isLast ? "Finish" : "Continue"}
      </button>
    </div>
  )
}

