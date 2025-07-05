import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>  <---- disable strict mode to avoid useEffect form running twice
    <App />
  // </StrictMode>,
)
