import jwt from "jsonwebtoken"

export const auth=(req, res, next)=>{
    if(!req.headers.authorization){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`No hay usuarios autenticados`})
    }

    // Bearer TOKEN
    // BEARER adsfasdf.asdf8asdf8adsf.asdfadsafasdf
    let token=req.headers.authorization.split(" ")[1]

    try {
        let usuario=jwt.verify(token, "CoderCoder123")
        req.user=usuario
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`${error.message}`})
    }

    next()
}