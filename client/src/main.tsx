import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/"        element={<Home/>} />
          <Route path="/sign-in" element={<SignInPage/>} />
          <Route path="/sign-up" element={<SignUpPage/>} />
          <Route path="/sounds"  element={<SoundsPage/>} />
          <Route path="/journal" element={<JournalPage/>} />
          <Route path="/report"  element={<ReportPage/>} />
          <Route path="/account" element={<AccountPage/>} />
          <Route path="/sleep" element={<SleepPage/>} />
          
          <Route path="*"        element={<NotFound/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)