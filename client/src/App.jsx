import './App.css'
import React, { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lookInSession } from './common/session.jsx'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import SignupAndLoginPage from './pages/SignupAndLoginPage'

export const userContext = createContext({})

function App() {
  const [userAuth, setUserAuth] = useState({ access_token: null })

  useEffect(() => {
    let userInSession = lookInSession("User")

    userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null })
  }, [])
  console.log(userAuth)

  return (
    <BrowserRouter>
      <userContext.Provider value={{ userAuth, setUserAuth }}>
        <Routes>
          <Route path='/*' element={<LandingPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/home/find' element={<HomePage />} />
          {/* <Route path='/home/appointment' element={<AppointmentForm />} /> */}
          <Route path='/signup' element={<SignupAndLoginPage type="signup" />} />
          <Route path='/login' element={<SignupAndLoginPage type="login" />} />
          {/* <Route path='/dashboard' element={<Dashboard />} /> */}
        </Routes>
      </userContext.Provider>
    </BrowserRouter>
  )
}

export default App
