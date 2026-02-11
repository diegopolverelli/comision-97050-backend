import { Router } from 'express';
import { controllerHandler, midd01, midd02, midd03, midd04 } from '../middlewares/middlewares.js';
export const router=Router()

router.get('/',(req,res)=>{

    let usuarios="usuarios"

    res.setHeader('Content-Type','application/json')
    res.status(200).json({usuarios})
})


let funciones=[midd01, midd02, midd03, midd04, controllerHandler]

// router.get('/pruebas', midd01, midd02, controllerHandler)
router.get('/pruebas', funciones)