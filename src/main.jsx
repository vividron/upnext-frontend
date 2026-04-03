import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Toaster
      position='top-right'
      toastOptions={{
        duration: 3000,
        style: {
          backgroundColor: "var(--surface)",
          color: "var(--text-primary)",
          border: "1px solid gray",
          zIndex: 100,
        },
      }}
      containerStyle={{ zIndex: 100 }}
    />
    <App />
  </AuthProvider>
)
