import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Reset from './css/Reset.js'
import GlobalStyle from './css/GlobalStlye.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Reset />
    <GlobalStyle />
    <App />
  </React.StrictMode>,
)
