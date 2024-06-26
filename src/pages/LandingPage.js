import { Button } from '@mui/joy'
import React from 'react'
import useAuth from '../hooks/useAuth'
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

export default function LandingPage () {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <div className="flex flex-col items-center justify-center h-screen space-y-4" style={{ height: 'calc(100vh - 60px)' }}>
      landingPage
      
      </div>
      </CssVarsProvider>
  )
}
