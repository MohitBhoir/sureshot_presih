import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './pages/home'
import Register from './pages/register'
import RegisterUser from './pages/registerUser'
import LoginUser from './pages/login'

const App = () => {
  return <>
     <Router>
           <Navbar/>
           <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<LoginUser/>}/>
                <Route path="/registerUser" element={<RegisterUser/>}/>
           </Routes>
     </Router>
  </>
}

export default App