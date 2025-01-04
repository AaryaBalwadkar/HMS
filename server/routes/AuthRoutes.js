import express from 'express'
import { googleAuthentication, login, signup } from '../controllers/AuthController.js'

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/google-auth", googleAuthentication)

export default router