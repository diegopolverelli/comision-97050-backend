import passport from "passport"
import local from "passport-local"
import { UsuariosManagerMongo as UsersManager } from "../dao/UsuariosManagerMONGO.js"
import { createHash, validaPass } from "../utils.js"

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

    passport.use("login", new local.Strategy(
        {
            usernameField: "email", 
            // passReqToCallback: true,
        }, 
        async(username, password, done)=>{
            try {
                let usuario=await usuariosManager.getBy({email: username})
                if(!usuario){
                    // res.setHeader('Content-Type','application/json');
                    // return res.status(401).json({error:`Credenciales inválidas`})
                    return done(null, false)
                }
        
                if(!validaPass(password, usuario.password)){
                    // res.setHeader('Content-Type','application/json');
                    // return res.status(401).json({error:`Credenciales inválidas`})
                    return done(null, false)
                }
        
                // quitar datos sensibles
                delete usuario.password

                return done(null, usuario)
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