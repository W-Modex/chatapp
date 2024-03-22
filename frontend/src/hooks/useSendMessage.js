import React, { useState, useEffect } from 'react'
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';
import { useSocketContext } from '../context/SocketContext';
import useGetMessages from './useGetMessages';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation()
    const {socket} = useSocketContext();

    const sendMessage = async (message) => {
        const success = handleErrors(message)
		if (!success) return;
        setLoading(true);
        try {
            const res = await fetch(`api/messages/send/${selectedConversation._id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({message})
            })
            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }
            setMessages([...messages, data])
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return {loading, sendMessage}
}

export default useSendMessage

const handleErrors = (msg) => {
    if (msg.length > 500) {
        toast.error('Max length of a message is 500')
        return false
    }

    return true;
}