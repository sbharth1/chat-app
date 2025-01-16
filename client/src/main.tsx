import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router,Routes,Route,} from 'react-router-dom'
import Signup from './components/Signup.tsx'
import Login from './components/Login.tsx'
import Navbar from './pages/Navbar.tsx'
import NotFound from './pages/NotFound.tsx'
import UserProfile from './pages/UserProfile.tsx'
import ForgetPassword from './pages/ForgetPassword.tsx'
import App from './App.tsx'
import ResetPassword from './pages/ResetPassword.tsx'

createRoot(document.getElementById('root')!).render(
  <Router>
    <Routes>
      {/* public routes */}
      <Route path="*" element={<NotFound/>}></Route>
      <Route path="/" element={<App/>}></Route>
      <Route path="/api/login" element={<Login/>}></Route>
      <Route path="/api/signup" element={<Signup/>}></Route>

      {/* private routes  */}
      <Route path="/api/dashboard" element={<Navbar/>}></Route>
      <Route path="/api/forgot-password" element={<ForgetPassword/>}></Route>
      <Route path="/api/user" element={<UserProfile/>}></Route>
      <Route path="/api/reset-password/:token" element={<ResetPassword/>}></Route>
      </Routes>  
  </Router>
)
