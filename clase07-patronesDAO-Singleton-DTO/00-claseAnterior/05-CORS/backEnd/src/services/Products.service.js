

export class ProductsService{
    #productsDAO
    constructor(dao){
        this.#productsDAO=dao
    }

    async getProducts(){
        return await this.#productsDAO.get()
    }

    async createProduct(product){
        return await this.#productsDAO.save(product)
    }
}