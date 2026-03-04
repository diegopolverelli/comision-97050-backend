export class ClientesRepository{
    #clientesDAO
    constructor(clientesDAO){
        this.#clientesDAO=clientesDAO
    }

    async getClientes(){
        return await this.#clientesDAO.get()
    }
}