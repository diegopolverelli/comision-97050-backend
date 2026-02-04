export const isAdmin=(req, res, next)=>{
    if(req.user.rol!="admin"){
        res.setHeader('Content-Type','application/json');
        return res.status(403).json({error:`No tiene privilegios suficientes para acceder al recurso solicitado`})
    }

    next()
}

export const isUser=(req, res, next)=>{
    if(req.user.rol!="user"){
        res.setHeader('Content-Type','application/json');
        return res.status(403).json({error:`No tiene privilegios suficientes para acceder al recurso solicitado`})
    }
    
    next()
}

export const auth=(permisos=[])=>{
    return (req, res, next)=>{
        if(!Array.isArray(permisos)){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Hay un problema con los permisos de la ruta. Contacte al administrador`})
        }

        permisos=permisos.map(p=>p.toLowerCase())

        if(permisos.includes("public")){
            return next()
        }

        if(!req.user || !req.user.rol){
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`No existen usuarios autenticados, o hay problemas con el rol`})
        }

        if(!permisos.includes(req.user.rol.toLowerCase())){   // ["admin", "user", "manager"]
            res.setHeader('Content-Type','application/json');
            return res.status(403).json({error:`No tiene privilegios suficientes para acceder al recurso solicitado`})
        }

        next()
    }
}