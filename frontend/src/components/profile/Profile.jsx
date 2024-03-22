import React, { useState } from 'react'
import { RxAvatar } from 'react-icons/rx'
import { RiEditLine } from "react-icons/ri";
import { MdOutlineSave } from "react-icons/md";
import {Link} from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext';
import formatDate from '../../utils/formatDate';

function Profile() {
    const {authUser} = useAuthContext()
    console.log(authUser.createdAt)
  return (
    <div className='max-w-[900px] mx-auto p-5 text-white'>
        <div className='flex gap-5 items-center mb-3'>
        <div className='md:text-[125px] text-5xl scale-110'>
            {authUser.profilePic ? 
            <div className="avatar">
            <div className="w-16 rounded-full md:w-24">
              <img src={authUser.profilePic} />
            </div>
          </div>
           : <RxAvatar />}
        </div>
        <div className='text-2xl'>
            <div className='flex items-center'>
            <h2 className='md:text-3xl'>{authUser.displayName}</h2>
            </div>
            <h4 className='text-xl md:text-2xl text-gray-400'>@{authUser.username}</h4>
        </div>
        </div>
        <hr className='border-gray-500'/>
            <h1 className='text-white my-3 font-medium text-3xl'>About me</h1>
                <p className="text-lg break-all">{authUser.about}</p>
        <p className='mt-2 text-lg'>Modex Chatapp member since {formatDate(authUser.createdAt)}</p>
        <div className='flex justify-center'>
        <Link to='/edit' className='mt-3'>
            <button className='btn btn-primary'>Edit Profile</button>
        </Link>
        </div>
    </div>
  )
}

export default Profile