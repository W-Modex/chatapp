import React, { useState } from 'react'
import { FaSnowflake } from 'react-icons/fa6'
import { TbLogout2 } from 'react-icons/tb'
import { RxAvatar } from 'react-icons/rx'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import { useAuthContext } from '../../context/AuthContext';

function Header() {
  const [openMenu, setOpenMenu] = useState(false)
  const {logout} = useLogout()
  const {authUser} = useAuthContext()

  return (
    <header className='bg-[#1C1C21] w-full block'>
      <div className='max-w-[1440px] p-5 flex items-center justify-between mx-auto text-white'>
        <div className='flex items-center gap-2'>
          <FaSnowflake className='text-2xl'/>
          <div className='text-2xl font-semibold'>Modex</div>
        </div>

        <div className='absolute top-[-400px] md:static flex gap-5 text-white text-xl  font-semibold'>
          <NavLink to='/' end className={({isActive}) => `${isActive ? 'bg-[#212429]' : ''} hover:bg-[#212429] p-3 rounded-lg cursor-pointer`}>Chats</NavLink>
          <NavLink to='/profile' className={({isActive}) => `${isActive ? 'bg-[#212429]' : ''} hover:bg-[#212429] p-3 rounded-lg cursor-pointer`}>Profile</NavLink>
        </div>
        <div className='flex items-center gap-4'>
          <div onClick={logout} className='text-4xl cursor-pointer hover:scale-110 absolute top-[-400px] md:static'><TbLogout2 /></div>
        <div className='text-3xl md:text-4xl hover:scale-110 cursor-pointer'>
        {authUser.profilePic ? 
            <div className="avatar">
            <div className="w-8 rounded-full">
              <img src={authUser.profilePic} />
            </div>
          </div>
           : <RxAvatar />}
        </div>
        <div className='text-3xl md:text-4xl hover:scale-110 md:hidden cursor-pointer' onClick={() => setOpenMenu(true)}>
          <GiHamburgerMenu/>
        </div>
        </div>
      </div>
      {openMenu && (
        <div className='fixed top-0 left-0 min-w-full min-h-screen bg-black/40' onClick={() => setOpenMenu(false)}>
        </div>
      )}
      {openMenu && (
        <div className='fixed p-5 min-h-screen top-0 right-0 w-[65%] md:hidden z-10 bg-[#1D1D23] '>
                  <IoCloseSharp onClick={() => setOpenMenu(false)} className='text-3xl'/>
          <div className='flex mt-20 flex-col gap-5 text-2xl'>
              <NavLink to='/' end>Chats</NavLink>
              <NavLink to='/profile' end>Profile</NavLink>
              <div className='text-4xl flex justify-end' onClick={logout}><TbLogout2 /></div>
              </div>
          </div>
        )}
        <hr className='border-gray-500 w-full'/>
      </header>
  )
}

export default Header