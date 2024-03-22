import React from 'react'
import { RxAvatar } from 'react-icons/rx'
import useConversation from '../../zustand/useConversation.js'
import { useSocketContext } from "../../context/SocketContext";

function Conversation({conversation}) {
  const {selectedConversation, setSelectedConversation} = useConversation()
  const isSelected = selectedConversation?._id === conversation._id
	const {onlineUsers} = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id)

  return (
    <div className={`flex mt-4 p-1 hover:bg-[#212429] rounded-lg cursor-pointer gap-2  items-center ${isSelected ? 'bg-[#212429]' : ''}`} onClick={() => setSelectedConversation(conversation)}>
    <div className={`avatar rounded-full ${isOnline ? 'online' : ''}`}>
    {conversation.profilePic ? 
            <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={conversation.profilePic} />
            </div>
          </div>
           : <RxAvatar className='text-5xl'/>}
    </div>
    <div className='text-lg'>
    <p className='text-white font-semibold '>{conversation.displayName ? conversation.displayName : conversation.username}</p>
    </div>
    </div>
  )
}

export default Conversation