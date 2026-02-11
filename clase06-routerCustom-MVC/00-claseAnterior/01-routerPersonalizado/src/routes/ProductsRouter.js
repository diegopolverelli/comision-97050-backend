import { midd01, midd02 } from "../middlewares/middlewares.js";
import { CustomRouter } from "./Custom.routes.js";


export class ProductsRouter extends CustomRouter {
    init() {
        this.get("/", (req, res) => {

            if(req.query.error){
                return res.badRequest("error de pruebas...!!!")
            }

            let productos = "productos"

            // res.setHeader('Content-Type', 'application/json');
            // return res.status(200).json({ payload: productos });
            res.success(productos)
        })

        this.get(
            "/compras",
            midd01, 
            midd02, 
            (req, res, next)=>{
                console.log(`Otro middleware...!!!`)
                next()
            },
            (req, res) => {

                let compras = "compras de productos"

                if(req.query.error){
                    throw new Error("error de pruebas II...!!!")
                }
    

                // res.setHeader('Content-Type', 'application/json');
                // return res.status(200).json({ payload: compras });
                res.success(compras)
            }
        )

        this.post("/", (req, res)=>{

            let datos=req.body

            res.success(datos)
        })
    }
}