import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/navbar'
import Home from './pages/home'
import Register from './pages/register'
import LoginUser from './pages/login'
import RegisterStudent from './pages/registerStudent'
import RegisterInstitute from './pages/registerInstitute'
import RegisterFaculty from './pages/registerFaculty'
import StudentDash from './pages/studentDashboard'
import TestWindow from './pages/testWindow'
import Test from './pages/test'

const App = () => {
  return <>
     <Router>
           <Navbar/>
           <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<LoginUser/>}/>
                <Route path="/registerStudent" element={<RegisterStudent/>}/>
                <Route path="/registerInstitute" element={<RegisterInstitute/>}/>
                <Route path="/registerFaculty" element={<RegisterFaculty/>}/>
                <Route path="/studentDashboard" element={<StudentDash/>}/>
                <Route path="/testWindow" element={<TestWindow/>} />
                <Route path="/test" element={<Test/>} />
           </Routes>
     </Router>
    <ToastContainer/>
  </>
}

export default App