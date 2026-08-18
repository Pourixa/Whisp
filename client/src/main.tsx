import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter , RouterProvider} from "react-router"
import './index.css'
import { EditProfile } from './EditProfile.tsx'
import { ViewProfile } from './viewProfile.tsx'
import { Signup } from './signup.tsx'
import { Login } from './login.tsx'
import { ChatsNPage } from './ChatsNPage';
import { CreateGroup } from './creatGroup.tsx'

const route = createBrowserRouter([
  {
    path:"/",
    element:<ChatsNPage/>,
  } , 
  {
    path:"/login",
    element:<Login/>
  } , 
  {
    path:"/signup",
    element:<Signup/>
  } , 
  {
    path:"/editProfile",
    element:<EditProfile/>
  },
  {
    path:"/viewProfile/:username",
    element:<ViewProfile/>
  },
  {
    path:"/createGroup",
    element:<CreateGroup/>
  }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={route}/>
  </StrictMode>,
)
