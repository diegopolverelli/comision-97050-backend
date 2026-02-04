import passport from "passport"
import local from "passport-local"
import passportJWT from "passport-jwt"

import fs from "fs"
import bcrypt from "bcrypt"
import { config } from "./config.js"


const buscarToken=req=>{
    let token=null

    if(req.cookies.cookietoken){
        token=req.cookies.cookietoken
    }

    return token
}

export const configPassport=()=>{

    // paso 1
    passport.use("login", new local.Strategy(
        {
            usernameField: "email"
        }, 
        async(username, password, done)=>{
            try {
                let usuarios=JSON.parse(fs.readFileSync('./src/usuarios.json','utf8'))

                let usuario=usuarios.find(u=>u.email===username)
                if(!usuario){
                    // return res.status(400).send({error:`Error credenciales`})
                    return done(null, false, {message: "Credenciales inválidas"})
                } 
                
                if(!bcrypt.compareSync(password, usuario.password)) {
                    // return res.status(400).send({error:`Error credenciales`})
                    return done(null, false, {message: "Credenciales inválidas"})
                }

                return done(null, usuario)
                            
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use("current", new passportJWT.Strategy(
        {
            secretOrKey: config.SECRET, 
            jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([buscarToken])
        }, 
        async(usuario, done)=>{
            try {
                if(usuario.nombre=="Juan"){
                    return done(null, false, {message:`El usuario Juan tiene el acceso temporalmente inhabilitado. Contacte al administrador`})
                }
            
                return done(null, usuario)
            } catch (error) {
                return done(error)
            }
        }
    ))

    // paso 1b // solo si usamos sessions
    // passport.serializeUser()
    // passport.deserializeUser()

}
