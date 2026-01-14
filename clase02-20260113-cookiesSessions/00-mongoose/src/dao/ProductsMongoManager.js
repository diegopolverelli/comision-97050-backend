import { productsModel } from "./models/productsModel.js";

export class ProductsMongoManager{
    static async getProducts(filtro={}){
        return await productsModel.find(filtro).lean()
    }

    static async createProduct(product){
        let nuevoProducto=await productsModel.create(product)
        return nuevoProducto.toJSON()
    }

    // listarProductos(){
    //     return productos
    // }
}


// ProductsManager.getProducts()
// let productsManager=new ProductsManager()
// productsManager.listarProductos()