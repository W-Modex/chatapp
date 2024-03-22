import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { app, server } from './socket/socket.js';
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import messageRoutes from './routes/message.routes.js';
import Image from './models/image.model.js'
import cors from 'cors'

import connectToMongoDB from './db/connectToMongoDB.js'

const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

dotenv.config()

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/messages', messageRoutes)
app.get('/api/uploads', async(req, res) => {
    try {
        Image.find({}).then(data => {
            res.json(data)
        })
    } catch (error) {
        res.json({error})
    }
})
app.post('/api/uploads', async(req, res) => {
    const body = req.body;
    try {
        const newImage = await Image.create(body)
        newImage.save()
        res.status(201).json({msg: 'New Profile Image Uploaded!'})
    } catch (error) {
        res.status(409).json({message: error.message})
    }
})

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server is running on ${PORT}`);
})

