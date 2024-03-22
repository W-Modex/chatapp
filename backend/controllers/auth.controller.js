import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/generateToken.js'

export const signupUser = async(req, res) => {
    try {
        const {username, email, password, confirmPassword} = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({error: "Passwords doesn't match"});
        }

        const trimmedUsername = username.trim();
        
        const user = await User.findOne({username: trimmedUsername})
        
        if (user) {
            return res.status(400).json({error: 'Username already exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username: trimmedUsername,
            email,
            password: hashedPassword,
            displayName: trimmedUsername,
            about: `Hello My name is ${trimmedUsername}`,
            profilePic: null
        })

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()
            return res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                displayName: newUser.displayName,
                about: newUser.about,
                profilePic: newUser.profilePic,
                createdAt: newUser.createdAt
            })
        } else {
            return res.status(400).json({error: 'Invalid user data'})
        }

    } catch (error) {
        console.log('Error in signupUser controller: ', error.message);
        res.status(500).json({error: 'Internal Server Error'})
    }
}

export const loginUser = async(req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '')

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({error: 'Invalid username or password'})
        }

        generateTokenAndSetCookie(user._id, res)

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            displayName: user.displayName,
            about: user.about,
            profilePic: user.profilePic,
            createdAt: user.createdAt
        })

    } catch (error) {
        console.log('Error in the loginUser Controller: ', error.message)
        res.status(500).json({error: 'Internal Server Error'})
    }
}

export const logoutUser = async(req, res) => {
    try {
        res.cookie('jwt', '', {maxAge: 0})
        res.status(200).json({message: 'Logged out successfully'})
    } catch (error) {
        console.log('Error in logoutUser controller: ', error.message)
        res.status(500).json({error: 'Internal Server Error'})
    }
}