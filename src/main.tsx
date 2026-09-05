import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import posthog from 'posthog-js'
import './index.css'
import App from './App.tsx'

posthog.init(
  import.meta.env.VITE_PUBLIC_POSTHOG_KEY ?? 'phc_BNLni8BJhhg3mhQMdzLGTUmDofr75eANx2KzLsMZshUN',
  {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com',
    defaults: '2026-01-30',
  },
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
