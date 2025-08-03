import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './global.css'
import { ThemeProvider } from '@/components/theme-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <App />
    </ThemeProvider>
  </StrictMode>,
)
