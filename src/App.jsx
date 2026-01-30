
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Section from './components/Section'
import Login from './pages/Login'
import Register from './pages/Register'
import BlogHomePage from './pages/BlogHomePage'
import BlogList from './pages/BlogList';
import { useContext } from 'react'
import { AuthContext } from './auth/AuthProvider'
import AdminPage from './pages/AdminPage'

function App() {
const {state} = useContext(AuthContext);

const showNavbar = !(state.isAuthenticated && state.user?.role === "admin");

  return (

      <div className='body'>
        {showNavbar && <Navbar/>}
        <div className='flex-1  h-full flex flex-col'>
     
          <Routes>
            <Route path='/' element={
              <>
                <Header/>
                <Section/>
                <BlogHomePage/>
              </>} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path='/blog' element={<BlogList/>}/>
            <Route path="/dashboard/*" element={<AdminPage/>}/>
          </Routes>
        </div>
       
      </div>


  )
}

export default App
