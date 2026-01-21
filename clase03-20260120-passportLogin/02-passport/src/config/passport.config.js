import passport from "passport"
import local from "passport-local"
import { UsuariosManagerMongo as UsersManager } from "../dao/UsuariosManagerMONGO.js"
import { createHash } from "../utils.js"

const usuariosManager=new UsersManager()

export const iniciarPassport=()=>{

    // paso 1
    passport.use("registro", new local.Strategy(
        {
            usernameField: "email", 
            // passwordField: "clave",
            passReqToCallback: true
        }, 
        async(req, username, password, done)=>{
            try {
                let {nombre}=req.body
                if(!nombre){
                    // res.setHeader('Content-Type','application/json');
                    // return res.status(400).json({error:`Complete email nombre password`})
                    return done(null, false)
                }    
                // validaciones pertinentes
            
                    let existe=await usuariosManager.getBy({email: username})
                    if(existe){
                        // res.setHeader('Content-Type','application/json');
                        // return res.status(400).json({error:`Usuario con email ${email} ya existe en BD`})   
                        return done(null, false)
                    }
            
                    // console.log(password)
                    password=createHash(password)
            
                    let nuevoUsuario=await usuariosManager.create({nombre, email: username, password})
                    return done(null, nuevoUsuario)
                            
            } catch (error) {
                return done(error)
            }
        }
    ))



    // paso 1' (solo si uso Sessions...!!)
    passport.serializeUser((usuario, done)=>{
        return done(null, usuario._id)
    })

    passport.deserializeUser(async(id, done)=>{
        let usuario=await usuariosManager.getBy({_id: id})
        return done(null, usuario)
    })
}