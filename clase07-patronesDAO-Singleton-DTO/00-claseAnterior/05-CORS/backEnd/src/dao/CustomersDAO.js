export class CustomersDAO{
    constructor(){
        this.clientes=[]
    }

    async get(){
        return this.clientes
    }

    async save(cliente){
        let id=1
        if(this.clientes.length>0){
            id=Math.max(...this.clientes.map(d=>d.id))+1
        }
        
        let nuevoCliente={id, ...cliente}
        this.clientes.push(nuevoCliente)
        return nuevoCliente
    }

    // getById, update, delete
}