import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
    myFile: String,
})

export default mongoose.models.images || mongoose.model('image', imageSchema)