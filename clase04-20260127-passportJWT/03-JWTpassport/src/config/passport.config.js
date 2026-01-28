import passport from "passport"
import passportJWT from "passport-jwt"

const buscarToken=req=>{
    let token=null

    if(req.cookies.tokencookie){
        token=req.cookies.tokencookie
    }

    return token
}

export const iniciarPassport=()=>{


    // paso 1
    passport.use("current", new passportJWT.Strategy(
        {
            secretOrKey: "CoderCoder123",
            jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([buscarToken])
        },
        async(usuario, done)=>{
            try {
                return done(null, usuario)
            } catch (error) {
                return done(error)
            }
        }
    ))


    // paso 1 '  // solo si SESSIONS..!!!
    // passport.serializeUser()
    // passport.deserializeUser()

}