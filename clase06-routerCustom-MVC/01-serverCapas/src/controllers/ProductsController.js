// import { ProductsDAO } from "../dao/ProductsDAO.js";

import { productsService } from "../services/index.js";


export class ProductsController{
    static async getProducts(req,res){

        // let productos="productos"
        // let productos=await ProductsDAO.get()
        let productos=await productsService.getProducts()
    
        try {
            res.setHeader('Content-Type','application/json')
            res.status(200).json({productos})
        } catch (error) {
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`internal server error`})
        }
    }

    static async createProduct(req, res){
        let {title, price}=req.body
        // validaciones pertinentes

        try {
            // let nuevoProducto={id:108, title, price}
            // let nuevoProducto=await ProductsDAO.save({title, price, stock:0})
            let nuevoProducto=await productsService.createProduct({title, price, stock:0})

            res.setHeader('Content-Type','application/json');
            return res.status(201).json({payload: nuevoProducto});
        } catch (error) {
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`internal server error`})
        }
    }
}