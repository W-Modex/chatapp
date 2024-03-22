import express from 'express'
import protectRoute from '../middlewares/protectRoute.js'
import { getUsersForSidebar, editProfile } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', protectRoute, getUsersForSidebar)
router.post('/profile', protectRoute, editProfile)

export default router;