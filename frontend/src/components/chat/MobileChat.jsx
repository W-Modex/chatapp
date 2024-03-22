import React from 'react'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import Messages from './Messages'
import Sidebar from '../sidebar/Sidebar'
import useConversation from '../../zustand/useConversation'

function Chat() {
  const {selectedConversation} = useConversation()

  return (
    <div className='bg-[#1C1C21] overflow-y-auto justify-center mx-auto flex'>
    <div className='w-full min-h-screen border-r border-gray-500'>
     {selectedConversation ? 
     <div>
      <ChatHeader />
      <Messages />
      <MessageInput />
     </div>
       : <>
       <p className='text-white  text-lg font-medium text-center mt-2'>Select a user to Chat with</p>
       <Sidebar/>
       </>}
       </div>
    </div>
  )
}

export default Chat