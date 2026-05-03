import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import '../../packages/core/ignix-lite.min.css'
import '../../packages/core/ignix-lite.min.js'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)