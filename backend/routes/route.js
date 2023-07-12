import { Router } from 'express';
import { createUser } from '../controllers/registerController.js'
import { loginUser } from '../controllers/loginController.js'
import { verifyToken } from '../middleware/auth.js'

const router = Router();

router.post('/register', createUser)
router.post('/login', loginUser)
router.post('/profile', verifyToken, (req, res)=>{
    res.send('Доступ получен')
})

export default router;