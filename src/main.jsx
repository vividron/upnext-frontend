import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Toaster position='top-right' toastOptions={{ duration: 3000, style: {backgroundColor: "var(--bg-surface)", color: "var(--text-primary)", border: "2px solid grey"} }} />
      <App />
    </AuthProvider>
  </StrictMode>,
)
