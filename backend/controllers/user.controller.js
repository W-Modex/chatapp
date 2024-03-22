import User from "../models/user.model.js"

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id

        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password") // $ne = find everyone except the loggedInUserId
        
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message)
        res.status(500).json({error: 'Internal server error'})
    }
}

export const editProfile = async(req, res) => {
    try {
        const user = req.user;

        if (user) {
            user.displayName = req.body.displayName || user.displayName
            user.profilePic = req.body.profilePic.myFile || user.profilePic
            user.about = req.body.about || user.about
        } else {
            res.status(404).json({error: 'User Not Found'})
        }

        const updatedUser = await user.save()

        res.status(200).json(updatedUser)

    } catch (error) {
        console.error("Error in editProfile Controller", error.message)
        res.status(500).json({error: 'Internal server error'})
    }
}