import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Sijelo } from './lukin/sijelo';
import './index.css'

createRoot(document.getElementById('sijelo')!).render(
  <StrictMode>
    <Sijelo />
  </StrictMode>
)
