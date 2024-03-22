import React from 'react'
import { RxAvatar } from 'react-icons/rx'
import {useAuthContext} from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation'
import {extractTime} from '../../utils/extractTime.js'

function Message({message}) {
  const {authUser} = useAuthContext()
  const {selectedConversation} = useConversation()
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt)
  const chatClassName = fromMe ? 'chat-start' : 'chat-end'
  const profilePic = fromMe ? authUser?.profilePic : selectedConversation?.profilePic
  const bubbleBgColor = fromMe ? 'bg-blue-500' : 'bg-[#212429]'

  return (
    <div className={`chat ${chatClassName}`}>
    <div className="chat-image avatar">
        <div className="text-5xl text-white rounded-full">
        {profilePic ? 
            <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={profilePic} />
            </div>
          </div>
           : <RxAvatar className='text-5xl'/>}
        </div>
    </div>
    <div className={`text-white ${bubbleBgColor} text-lg chat-bubble break-all`}>{message.message}</div>
    <div className='text-sm'>Sent on {formattedTime}</div>
    </div>
  )
}

export default Message