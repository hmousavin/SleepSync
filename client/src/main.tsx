import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import OnboardingPage from './pages/OnboardingPage'
import SignInPage from './pages/sign-in'
import SignUpPage from './pages/sign-up'
import NotFound from './pages/not-found'
import RootLayout from './pages/layout'
import JournalPage from './pages/journal'
import ReportPage from './pages/report'
import SoundsPage from './pages/sounds'
import AccountPage from './pages/account'
import SleepPage from './pages/sleep'
import './input.css'
import AuthRedirect from './auth/AuthRedirect'
import ProtectedRoute from './auth/ProtectedRoute'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthRedirect/>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/onboarding" element={<OnboardingPage/>} />
          <Route path="/sign-up" element={<SignUpPage/>} />
          <Route path="/sign-in" element={<SignInPage/>} />

          <Route path="/"        element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path="/sounds"  element={<ProtectedRoute><SoundsPage/></ProtectedRoute>} />
          <Route path="/journal" element={<ProtectedRoute><JournalPage/></ProtectedRoute>} />
          <Route path="/report"  element={<ProtectedRoute><ReportPage/></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><AccountPage/></ProtectedRoute>} />
          <Route path="/sleep"   element={<ProtectedRoute><SleepPage/></ProtectedRoute>} />
          
          <Route path="*"        element={<NotFound/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)