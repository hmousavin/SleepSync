import type React from "react"

export function MobileFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-screen max-w-md overflow-hidden bg-background px-4 py-8 shadow-xl dark:bg-gray-900 sm:rounded-xl sm:px-6 sm:py-12 md:my-8">
      {children}
    </div>
  )
}

