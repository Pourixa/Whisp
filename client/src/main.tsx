import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Chats from './chats.tsx'
import { ChatPage } from './chatPage.tsx'
import { EditProfile } from './EditProfile.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EditProfile />
  </StrictMode>,
)
