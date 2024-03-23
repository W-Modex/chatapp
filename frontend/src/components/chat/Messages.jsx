import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../../components/Skeletons/MessageSkeleton'
import { useSocketContext } from '../../context/SocketContext'

function Messages() {
  const {loading, messages} = useGetMessages()
  const {socket} = useSocketContext()
  const messageContainerRef = useRef(null);
  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom()
  }, [messages])


  return (
    <div className='px-5 mt-2 h-[450px] md:h-[700px] overflow-y-auto' ref={messageContainerRef}>
       {!loading && messages.length > 0 && messages.map((message) => (
				<div key={message._id}>
				<Message message={message} />
				</div>
			))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
				<p className="text-center">Send a message to start the conversation</p>
			)}
    </div>
  )
}

export default Messages