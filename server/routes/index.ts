import { Router } from 'express'
import { getHomePage } from '../controllers/index.js'

const router = Router()

router.get('/', getHomePage)

export default router
