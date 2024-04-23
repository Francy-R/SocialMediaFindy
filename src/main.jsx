import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './router/AppRouter'
import "./styles/style.scss"
import { PerfilContextProvider } from './context/PerfilContext'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <AppRouter/>
 
   
    
    
  </React.StrictMode>,
)