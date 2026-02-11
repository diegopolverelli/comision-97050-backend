import {Router} from "express"


export class CustomRouter{
    #router
    constructor(){
        this.#router=Router()
        this.init()
    }

    getRouter(){
        return this.#router
    }

    init(){}

    get(ruta, ...funciones){    // ... son aqui el operador REST
        this.#router.get(ruta, this.customResponses, this.procesaFunciones(funciones))
    }

    post(ruta, ...funciones){    // ... son aqui el operador REST
        this.#router.post(ruta, this.customResponses, this.procesaFunciones(funciones))
    }

    procesaFunciones=(funciones=[])=>{  // (req, res, next), (req, res)
        return funciones.map(fn=>{
            return async(...argumentos)=>{    // ... son el op. REST
                try {
                    return fn(...argumentos)   // ... son el op. SPREAD
                } catch (error) {
                    return argumentos[1].internalServerError(error.message)
                }
            }
        })
    }

    customResponses(req, res, next){
        res.success=(datos)=>res.status(200).json({status: "ok", message: datos})
        res.badRequest=(error)=>res.status(400).json({status: "bad request", error})
        res.internalServerError=(error)=>res.status(500).json({status: "internal server error", error})

        next()
    }




}


// get(1, 2, 3, 4, 5, 6)
