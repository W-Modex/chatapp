import React, { useState } from 'react'
import { FaSnowflake } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {loading, login} = useLogin()

  const handleSumbit = async(e) => {
    e.preventDefault()

    await login(username, password)
  }

  return (
    <div className='bg-[#1C1C21] min-h-screen'>
        <header className='flex max-w-[1400px] mx-auto p-5 text-white gap-3 items-center'>
            <FaSnowflake className='text-2xl'/>
            <div className='text-2xl font-semibold'>Modex</div>
        </header>
      <hr className=' border-gray-500'/>
        <div>
            <form className='flex mx-auto max-w-[570px] flex-col p-5' onSubmit={handleSumbit}>
            <h2 className='text-2xl text-center md:text-start text-white lg:text-4xl my-7 lg:my-16 font-bold'>Welcome To Modex ChatApp!</h2>
            <div className='mb-3 lg:mb-6'>
            <label htmlFor="username" className='block font-semibold lg:text-xl text-white text-lg mb-2 lg:mb-5'>Username</label>
        <input 
        type="text" 
        placeholder="Enter Your Username" 
        className="input bg-[#212429] input-bordered w-full font-medium text-[#E5E8EB] max-w-[500px]"
        value={username}
        onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
            <label htmlFor="password" className='block font-semibold lg:text-xl text-white text-lg mb-2 lg:mb-5'>Password</label>
        <input 
        type="password" 
        placeholder="Enter Your Password" 
        className="input bg-[#212429] input-bordered w-full font-medium text-[#E5E8EB] max-w-[500px]"
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Link to='/signup' className="link link-hover hover:text-[#617AFA] my-3 w-fit">Don't Have An Account Yet? Create One!</Link>
            <button className="btn btn-active btn-neutral hover:bg-[#617AFA] hover:opacity-75 w-full bg-[#617AFA] max-w-[500px] text-lg text-white" disabled={loading}>{loading ? <span className="loading loading-spinner"></span> : "Login"}</button>
            </form>
        </div>
    </div>
  )
}

export default Login