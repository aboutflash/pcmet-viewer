import React, { StrictMode } from 'react'
import { registerSW } from 'virtual:pwa-register'
import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from '@/App'

const updateSW = registerSW({
  onNeedRefresh() {
    // Show a prompt to the user to refresh the app
    if (confirm('New content available. Reload?')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log('App is ready for offline use')
  }
})

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(
    <StrictMode>
      <App/>
    </StrictMode>,
  )
}
