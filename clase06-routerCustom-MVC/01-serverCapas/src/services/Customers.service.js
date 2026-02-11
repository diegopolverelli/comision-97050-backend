

export class CustomersService{
    #customersDAO
    constructor(dao){
        this.#customersDAO=dao
    }

    async getCustomers(){
        return await this.#customersDAO.get()
    }

    async createCustomer(cliente){
        return await this.#customersDAO.save(cliente)
    }
}