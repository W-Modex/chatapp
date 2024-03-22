import { useState } from 'react'
import './App.css'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import Chats from './pages/home/Chats'
import EditProfile from './pages/editProfile/EditProfile'
import Profiles from './pages/profile/Profiles'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'

function App() {
  const {authUser} = useAuthContext();

  return (
    <div className='overflow-hidden'>
      <Routes>
        <Route path='/' element={authUser ? <Chats /> : <Navigate to='/login' />} />
        <Route path='/profile' element={authUser ? <Profiles /> : <Navigate to='/login'/>} />
        <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to='/' />} />
        <Route path='/login' element={!authUser ? <Login /> : <Navigate to='/' />} />
        <Route path='/edit' element={authUser ? <EditProfile /> : <Navigate to='/login' />} />
      </Routes>
        <Toaster />
    </div>
  )
}

export default App
