export class ProductosRepository{
    #productosDAO
    constructor(productosDAO){
        this.#productosDAO=productosDAO
    }

    async getProducts(){
        return await this.#productosDAO.get()
    }

    async getProductById(id){
        let productos=await this.getProducts()
        return productos.find(p=>p.id==id)
    }
}