import React from 'react'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import Messages from './Messages'
import Sidebar from '../sidebar/Sidebar'
import useConversation from '../../zustand/useConversation'

function Chat() {
  const {selectedConversation} = useConversation()

  return (
    <div className='bg-[#1C1C21] overflow-y-auto max-w-[1440px] justify-center mx-auto flex'>
      <div className='absolute left-[-800px] md:static'>
        <Sidebar />
      </div>
      <div className='w-full min-h-screen border-r border-gray-500'>
     {selectedConversation ? 
     <div>
      <ChatHeader />
      <Messages />
      <MessageInput />
     </div>
       : <div className='text-white h-[800px] md:text-4xl text-2xl flex justify-center items-center'>Select a Conversation To Start Chatting.</div>}
       </div>
    </div>
  )
}

export default Chat