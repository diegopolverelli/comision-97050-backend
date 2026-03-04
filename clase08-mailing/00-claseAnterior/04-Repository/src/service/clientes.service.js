
// forEach, map, reduce, find(cliente=>cliente.id=="123") 

// let cart=await cartModel.findOne({_id:idCart})
// cart.products.forEach()    // {product:"adfasdf9asdf", quantity: 3}
// for(let i=1; ) / for of

export class ClientesService{
    #ClientesRepository
    #ProductosRepo
    #TicketsRepo
    constructor(RepoClientes, RepoProductos, RepoTickets){
        this.#ClientesRepository=RepoClientes
        this.#ProductosRepo= RepoProductos, 
        this.#TicketsRepo=RepoTickets
    }

    async getClientes(){
        return await this.#ClientesRepository.getClientes()
    }

    async comprar(){
        
    }
}