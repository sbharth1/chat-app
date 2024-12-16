import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Signup from './components/Signup.tsx'

createRoot(document.getElementById('root')!).render(
  <Router>
    <Routes>
      <Route path="/" element={<App/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      </Routes> 
  </Router>
)
