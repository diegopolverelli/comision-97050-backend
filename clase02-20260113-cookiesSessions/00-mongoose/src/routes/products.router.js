import {Router} from "express"
// import { ProductsManager } from "../dao/ProductsManager.js";
import { ProductsMongoManager as ProductsManager} from "../dao/ProductsMongoManager.js";

export const router=Router()

router.get("/", async(req, res)=>{

    let productos=await ProductsManager.getProducts()

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:productos});
})

router.post("/", async(req, res)=>{
    let {title, price, code, stock}=req.body
    if(!title || !code){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`title | code son requeridos`})
    }

    // validaciones varias... 

    try {
        let nuevoProducto=await ProductsManager.createProduct({title, price, code, stock})
        res.setHeader('Content-Type','application/json');
        return res.status(201).json({payload:"producto creado", nuevoProducto});
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal Server Error`})
    }


})