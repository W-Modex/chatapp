import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext()
    const {setSelectedConversation} = useConversation()
    
    const logout = async() => {
        setLoading(true)
        try {
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {"Content-Type": "application/json"}
            })
            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.removeItem('auth-user')
            setAuthUser(null)
            setSelectedConversation(null)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return {loading, logout};
}

export default useLogout