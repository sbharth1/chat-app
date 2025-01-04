import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Signup from './components/Signup.tsx'
import Login from './components/Login.tsx'
import Navbar from './pages/Navbar.tsx'
import NotFound from './pages/NotFound.tsx'

createRoot(document.getElementById('root')!).render(
  <Router>
    <Routes>
      <Route path="*" element={<NotFound/>}></Route>
      <Route path="/api/login" element={<Login/>}></Route>
      <Route path="/api/signup" element={<Signup/>}></Route>
      <Route path="/api/dashboard" element={<Navbar/>}></Route>
      </Routes> 
  </Router>
)
