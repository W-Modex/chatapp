import React, { useState } from 'react';
import { GrAttachment } from "react-icons/gr";
import useSendMessage from '../../hooks/useSendMessage';

function MessageInput() {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage('');
  };

  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
      <div className='relative w-full'>
        <label className="input bottom-2 mx-5 z-20 input-bordered flex justify-between items-center gap-2">
          <input
            type="text"
            className="w-full"
            placeholder="Send Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)} />
          <div className='flex items-center gap-2'>
            <button type='submit' className="btn bg-[#617AFA] min-h-0 h-[35px] hover:bg-[#617AFA] text-white font-semibold cursor-pointer hover:opacity-75" disabled={loading}>{loading ? <span className="loading loading-spinner"></span> : "Send"}</button>
          </div>
        </label>
      </div>
    </form>
  );
}

export default MessageInput;
