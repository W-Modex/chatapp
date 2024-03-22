import React, { useState, useEffect } from 'react'
import { RxAvatar } from 'react-icons/rx'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { GoPeople } from "react-icons/go";
import Conversations from '../sidebar/Conversations';
import {IoSearchSharp} from 'react-icons/io5'
import Sidebar from '../sidebar/Sidebar';
import { useSocketContext } from '../../context/SocketContext';
import useConversation from '../../zustand/useConversation';

function ChatHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
	const {onlineUsers} = useSocketContext();
  const {selectedConversation} = useConversation()
	const isOnline = onlineUsers.includes(selectedConversation._id)

  useEffect(() => {
    setMenuOpen(false);
  }, [selectedConversation]);

  return (
    <div className='flex w-full text-white justify-between p-5 md:justify-center bg-[#212429]'>
        <div className='text-3xl md:hidden' onClick={() => setMenuOpen(true)}>
            <GiHamburgerMenu />
        </div>
        <div className='flex font-medium gap-2 text-xl'>
            <p>To:</p>
            <div className='text-3xl'>
            {selectedConversation.profilePic ? 
            <div className={`avatar ${isOnline ? 'online' : ''}`}>
            <div className="w-8 rounded-full">
              <img src={selectedConversation.profilePic} />
            </div>
          </div>
           : <RxAvatar />}</div>
            <p>{selectedConversation.displayName || selectedConversation.username}</p>
        </div>
        <div></div>

        {menuOpen && (
        <div className='fixed top-0 left-0 z-20 min-w-full min-h-screen bg-black/40' onClick={() => setMenuOpen(false)}>
        </div>
      )}
        {menuOpen && (
        <div className='fixed bg-[#1C1C21] animate-fade-right animate-ease-in-out p-5 min-h-screen h-[calc(100vh-10px)] pt-[10px] top-0 left-0 w-full md:hidden z-30'>
          <IoCloseSharp onClick={() => setMenuOpen(false)} className='text-3xl'/>
            <div className='flex mt-14 flex-col gap-5 text-2xl'>
              <Sidebar />
            </div>
          </div>
        )}
    </div>
  )
}

export default ChatHeader