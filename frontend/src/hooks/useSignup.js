import React, { useState } from 'react'
import toast from "react-hot-toast";
import { useAuthContext } from '../context/AuthContext';


const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const {setAuthUser} = useAuthContext();

	const signup = async ({username, email, password, confirmPassword}) => {
		const success = handleInputErrors({username, email, password, confirmPassword})
		if (!success) return;
		setLoading(true)
		
		try {
			const res = await fetch('/api/auth/signup', {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({username, email, password, confirmPassword})
			});

			if (!res.ok) {
				throw new Error(`Failed to sign up: ${res.status} - ${res.statusText}`);
			  }

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error)
			}

			localStorage.setItem('auth-user', JSON.stringify(data))
			setAuthUser(data)
		} catch (error) {
			toast.error(error.message)
		} finally {
			setLoading(false)
		}
	};

	return {loading, signup};

}

export default useSignup

function handleInputErrors({ username, email, password, confirmPassword }) {
	if ( !username || !password || !confirmPassword || !email) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 8) {
		toast.error("Password must be at least 8 characters");
		return false;
	}

	return true;
}