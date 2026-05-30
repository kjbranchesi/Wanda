import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BrandSystem from './brand/BrandSystem'
import './brand-system.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrandSystem />
  </StrictMode>,
)
