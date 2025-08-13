import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RootPage from './RootPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import { Provider } from 'react-redux'
import { store } from './store/store'
import MyPosts from './pages/MyPosts/MyPosts'
import ProtectedRoute from './components/ProtectedRoute'
import CreatePost from './pages/CreatePost/CreatePost'
import Post from './pages/Post/Post'
import EditPost from './pages/CreatePost/EditPost'
import UserPosts from './pages/UserPosts/UserPosts'

//THIS SECTION IS FOR THE ROUTER PART 

const router = createBrowserRouter ([
  {
    path:"/",
    errorElement:<ErrorPage/>,
    element:<RootPage/>,
    children:[
      {
        path:"/" , 
        element:<Home/>
      },
      {
        path:"login",
        element:<Login/>
      }, 
      {
        path:"signup",
        element:<Signup/>
      } , 
      {
        path:"myposts",
        element:<ProtectedRoute><MyPosts/></ProtectedRoute>
      }, 
      {
        path:"create-post",
        element:<ProtectedRoute>
        <CreatePost></CreatePost>
        </ProtectedRoute>
      },
      {
        path:"post/:id",
        element:<ProtectedRoute>
          <Post/>
        </ProtectedRoute>
      },
      {
        path:"edit-post/:id",
        element:<ProtectedRoute>
          <EditPost/>
        </ProtectedRoute>
      },
      {
        path:"posts/:user",
        element:<ProtectedRoute>
          <UserPosts/>
        </ProtectedRoute>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
