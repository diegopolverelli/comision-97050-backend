export const auth=(req, res, next)=>{
    let {user, password}=req.body
    if(user!="admin" || password!="123"){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Credenciales invalidas`})
    }


    next()
}