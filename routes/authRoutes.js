import express from 'express'
const router = express.Router()

import rateLimiter from 'express-rate-limit' //use to limit the req for security purpose

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 10,   // maximum 10 requests from same IP for per 15min
    message: 'Too many requests from this IP, please try again after 15 minutes',
})

import { registerUser, loginUser, updateUser,getCurrentUser, logout } from '../controllers/authController.js'
import authenticateUser from '../middleware/auth.js'
import testUser from '../middleware/testUser.js'  //! testUser

router.post('/register', apiLimiter, registerUser)
router.post('/login', apiLimiter, loginUser)
router.get('/logout', logout)
router.patch('/updateUser', authenticateUser,testUser, updateUser) //!defined testUser to remove permissions for that particular testUser user...define it after authentication
router.get('/getCurrentUser', authenticateUser, getCurrentUser)
export default router
