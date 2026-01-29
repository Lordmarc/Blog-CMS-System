import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './auth/AuthProvider.jsx'
import UserProvider from './users/UserProvider.jsx'
import PostProvider from './posts/PostProvider.jsx'
import LogsProvider from './logs/LogsProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AuthProvider>
      <UserProvider>
        <PostProvider>
          <LogsProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </LogsProvider>
        </PostProvider>
      </UserProvider>
    </AuthProvider>

  </StrictMode>,
)
