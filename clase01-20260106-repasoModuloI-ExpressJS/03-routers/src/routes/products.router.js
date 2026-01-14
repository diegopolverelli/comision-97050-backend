import {Router} from "express"
import { ProductsManager } from "../dao/ProductsManager.js";

export const router=Router()

router.get("/", (req, res)=>{

    let productos=ProductsManager.getProducts()

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:productos});
})

router.post("/", (req, res)=>{

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"producto creado"});
})