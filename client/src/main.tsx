import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter , RouterProvider} from "react-router"
import './index.css'
import { EditProfile } from './EditProfile.tsx'
import { ViewProfile } from './viewProfile.tsx'
import { Signup } from './signup.tsx'
import { Login } from './login.tsx'
import { ChatsNPage } from './ChatsNPage';
import { CreateGroupMembers } from './components/group-page/createGroupMembers.tsx';
import { CreateGroup } from './creatGroup.tsx'
import { CreateGroupDetails } from '#components/group-page/createGroupDetails'
import { RouterError } from './routerError'

const route = createBrowserRouter([
  {
    path:"/",
    element:<ChatsNPage/>,
    errorElement:<RouterError/>,
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
    path:"/creategroup",
element:<CreateGroup/>,
    children:[
      {index:true,element:<CreateGroupMembers/>},
      {path:"creategroup/details",element:<CreateGroupDetails/>}
    ]
    }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={route}/>
  </StrictMode>,
)
