import React, { useState } from 'react'
import { FaSnowflake } from "react-icons/fa6";
import {Link} from 'react-router-dom'
import useSignup from '../../hooks/useSignup';

function Signup() {
  const [inputs, setInputs] = useState(
    {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  )
  const {loading, signup} = useSignup();

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    await signup(inputs);
  }

  return (
    <div className='bg-[#1C1C21] min-h-screen'>
      <header className='flex max-w-[1400px] mx-auto p-5 text-white gap-3 items-center'>
        <FaSnowflake className='text-2xl'/>
        <div className='text-2xl font-semibold'>Modex</div>
      </header>
      <hr className=' border-gray-500'/>
      <form className='mx-auto max-w-[570px] py-10 lg:py-20' onSubmit={handleSubmit}>
        <div className='px-5 mb-2'>
        <h2 className='text-2xl text-white lg:text-4xl mb-7 font-bold'>Create an account</h2>
        <div className='mb-3 lg:mb-6'>
        <label htmlFor="username" className='block font-semibold lg:text-xl text-white text-lg mb-2 lg:mb-3'>Username</label>
        <input 
        type="text" 
        placeholder="Enter Your Username" 
        className="input bg-[#212429] input-bordered w-full font-medium text-[#E5E8EB] max-w-[500px]" 
        value={inputs.username} 
        onChange={(e) => setInputs({...inputs, username: e.target.value})} />
        </div>
        <div className='mb-3 lg:mb-6'>
        <label htmlFor="email" className='block font-semibold lg:text-xl text-white text-lg mb-2 lg:mb-3'>Email</label>
        <input 
        type="email"
        placeholder="Enter Your email address" 
        className="input bg-[#212429] input-bordered w-full font-medium text-[#E5E8EB] max-w-[500px]" 
        value={inputs.email}
        onChange={(e) => setInputs({...inputs, email: e.target.value})}/>
        </div>
        <div className='mb-3 lg:mb-6'>
        <label htmlFor="password" className='block font-semibold lg:text-xl text-white text-lg mb-2 lg:mb-3'>Password</label>
        <input 
        type="password" 
        placeholder="Enter Your Password" 
        className="input bg-[#212429] input-bordered w-full font-medium text-[#E5E8EB] max-w-[500px]"
        value={inputs.password}
        onChange={(e) => setInputs({...inputs, password: e.target.value})} />
        </div>
        <div>
        <label htmlFor="confirmPassword" className='block lg:text-xl font-semibold text-white text-lg mb-2 lg:mb-3'>Confirm Password</label>
        <input 
        type="password" 
        placeholder="Confirm Your Password" 
        className="input bg-[#212429] input-bordered w-full font-medium text-[#E5E8EB] max-w-[500px]" 
        value={inputs.confirmPassword}
        onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}/>
        </div>
        </div>
        <Link to='/login' className="link link-hover w-fit hover:text-[#617AFA] px-5">Already Have An Account?</Link>
        <div className='px-5 mt-2'>
        <button className="btn btn-active btn-neutral hover:bg-[#617AFA] hover:opacity-75 w-full bg-[#617AFA] max-w-[500px] text-lg text-white" disabled={loading}>{loading ? <span className="loading loading-spinner"></span> : "Sign Up"}</button>
        </div>
      </form>
    </div>
  )
}

export default Signup