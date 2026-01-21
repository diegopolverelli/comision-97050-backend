import { Router } from 'express';
import { UsuariosManagerMongo as UsuariosManager } from '../dao/UsuariosManagerMONGO.js';
import { createHash, validaPass } from '../utils.js';
export const router=Router()

const usuariosManager=new UsuariosManager()

router.post('/register',async(req,res)=>{

    let {nombre, email, password}=req.body
    if(!nombre || !email || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete email nombre password`})
    }    
    // validaciones pertinentes

    try {
        let existe=await usuariosManager.getBy({email})
        if(existe){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Usuario con email ${email} ya existe en BD`})   
        }

        console.log(password)
        password=createHash(password)

        let nuevoUsuario=await usuariosManager.create({nombre, email, password})
        
        res.setHeader('Content-Type','application/json')
        res.status(201).json({
            message: `Registro exitoso`, 
            nuevoUsuario
        })
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal Server Error`})
    }


})

router.post("/login", async(req, res)=>{
    let {email, password}=req.body
    if(!email || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete email | password`})
    }

    try {
        let usuario=await usuariosManager.getBy({email})
        if(!usuario){
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`Credenciales inválidas`})
        }

        if(!validaPass(password, usuario.password)){
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`Credenciales inválidas`})
        }

        // quitar datos sensibles
        delete usuario.password

        req.session.usuario=usuario

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({message:`Login exitoso`, usuario});
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal Server Error`})
    }
})

router.get("/logout", (req, res)=>{
    req.session.destroy(e=>{
        if(e){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Error al procesar logout`})
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Logout exitoso"});
    })
})