import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import CreatePost from './pages/CreatePost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './components/Post.jsx'
import NotFound from './pages/NotFound.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index={true} element={<App />} />

          <Route
            index={false}
            path="/createPost"
            element={<CreatePost />}
          />

          <Route
            index={false}
            path="/editPost/:id"
            element={<EditPost />}
          />
          
          <Route
            index={false}
            path="/moreInfo/:id"
            element={<Post />}
          />
          
          <Route path="*" element={<NotFound />} />

        </Route>
        
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
