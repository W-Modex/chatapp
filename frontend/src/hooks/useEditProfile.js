import { useState } from "react"
import {useAuthContext} from '../context/AuthContext'
import toast from "react-hot-toast";

const useEditProfile = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext()
    
    const editProfile = async({displayName, profilePic, about}) => {
        const success = handleInputErrors({displayName, about})
        if (!success) return false;
        setLoading(true)
        try {
            const res = await fetch('/api/users/profile', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({displayName, profilePic, about})
            })

            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }

            const auth = JSON.parse(localStorage.getItem('auth-user'))
            auth.displayName = data.displayName;
            auth.about = data.about;
            auth.profilePic = data.profilePic
            localStorage.setItem('auth-user', JSON.stringify(auth))
            setAuthUser(data)
            return true;
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return {loading, editProfile};
}

export default useEditProfile

const handleInputErrors = ({displayName, about}) => {
    if (displayName.length < 3 && displayName !== '') {
        toast.error("display name should be at least 3 characters")
        return false;
    }
    if (displayName.length > 15 && displayName !== '') {
        toast.error('display name should be less than 15 characters')
        return false;
    }
    if (about.length < 10 && about !== '') {
        toast.error('about should be atleast 10 characters')
        return false;
    }
    if (about.length > 100 && displayName !== '') {
        toast.error('about should be less than 100 characters')
        return false;
    }
    return true;
}