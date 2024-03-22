import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations'

function Conversations({conversations}) {
  const {loading} = useGetConversations();

  return (
    <div className='overflow-y-auto'>
        {conversations.map((conversation) => (
          <Conversation key={conversation._id} conversation={conversation} />
        ))}
        {loading ? <span className="loading loading-spinner"></span> : ""}
    </div>
  )
}

export default Conversations