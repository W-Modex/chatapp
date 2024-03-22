import mongoose from "mongoose";

 const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to mongoDB')
    } catch (error) {
        console.log('Error connecting to mongodb: ', error.message)
    }
}

export default connectToMongoDB;