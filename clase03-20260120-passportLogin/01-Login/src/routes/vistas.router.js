import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
export const router = Router()

router.get('/', (req, res) => {

    res.status(200).render('home')
})

router.get('/login', (req, res) => {

    res.status(200).render('login')
})


router.get(
    '/perfil', 
    auth,
    (req, res) => {

        res.status(200).render('perfil',
            {
                nombre: req.user.nombre, 
                email: req.user.email
            }
        )
    }
)
