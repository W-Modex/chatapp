import React, { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import Conversations from './Conversations';
import useGetConversations from '../../hooks/useGetConversations';

function Sidebar() {
  const { conversations } = useGetConversations();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(conversation => {
    const name = conversation.displayName || conversation.username
    return name.toLowerCase().includes(searchQuery.toLowerCase())
  }
  );

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className='px-8 bg-[#1C1C21] h-[calc(100%-72px)] md:h-[calc(100%-120px)] overflow-y-auto py-4 md:border-x border-gray-500'>
      <label className='input bg-[#212429] input-bordered flex items-center gap-2'>
        <input
          type='text'
          className='grow text-sm'
          placeholder='Search for conversations'
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <IoSearchSharp className='text-xl' />
      </label>
      <Conversations conversations={filteredConversations} />
    </div>
  );
}

export default Sidebar;
