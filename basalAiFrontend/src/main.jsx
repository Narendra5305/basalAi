import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {JobPortalContextProvider} from "../context/contextApi.jsx"

createRoot(document.getElementById('root')).render(
  <JobPortalContextProvider>
    <App />
  </JobPortalContextProvider>,
)
