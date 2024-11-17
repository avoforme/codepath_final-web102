import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext'; // Import ThemeProvider
import Navbar from './components/Navbar.jsx';
import CreatePost from './pages/CreatePost.jsx';
import EditPost from './pages/EditPost.jsx';
import Post from './components/Post.jsx';
import NotFound from './pages/NotFound.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        {/* Navbar is placed outside the Routes so it's always visible */}
        <Navbar />
        <Routes>
          {/* Home route */}
          <Route path="/" element={<App />} />
          
          {/* Create and Edit Post routes */}
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/editPost/:id" element={<EditPost />} />
          
          {/* More Info Post route */}
          <Route path="/moreInfo/:id" element={<Post />} />
          
          {/* Settings Page */}
          <Route path="/settings" element={<SettingsPage />} />
          
          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
