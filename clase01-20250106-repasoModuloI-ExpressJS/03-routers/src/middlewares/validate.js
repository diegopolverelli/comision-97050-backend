export const validate=(req, res, next)=>{
    let {nombre}=req.query
    console.log(nombre)

    if(!nombre){
        console.log(1)
        req.query.nombre="NO IDENTIFICADO"
    }else{
        console.log(2)
        req.query.nombre=req.query.nombre.toUpperCase()
    }

    console.log(req.query.nombre)

    next()
}