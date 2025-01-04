import React, { useContext } from 'react'
import { useAuthStore } from '../store/AuthStore'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { userContext } from '@/App'

const LandingPage = () => {
    const { userAuth: { access_token }, setUserAuth } = useContext(userContext);
        
  return (
    access_token ?
    <Navigate to="/home" />
    : (
    <div>
      <h1>Landing Page</h1>
    </div>
    )
  )
}

export default LandingPage
