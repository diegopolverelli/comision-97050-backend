export const validate=(req, res, next)=>{
    let {nombre}=req.query
    // console.log(nombre)

    if(!nombre){
        console.log(1)
        // req.query.nombre="NO IDENTIFICADO"
        req.nombre="NO IDENTIFICADO"
        res.locals.nombre="NO IDENTIFICADO"
    }else{
        console.log(2)
        // req.query.nombre=req.query.nombre.toUpperCase()
        req.nombre=nombre.toUpperCase()
        res.locals.nombre.toUpperCase()
    }

    // console.log(req.query.nombre)

    next()
}