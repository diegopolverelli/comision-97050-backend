const clientes=[
    {
        id:1, 
        razonSocial:"Cliente 001", 
        idTributaria: "99-99999999-1"
    },
    {
        id:2, 
        razonSocial:"Cliente 002", 
        idTributaria: "99-99999999-2"
    },
]


export class MemoryClientesDAO{
    constructor(){}

    get(){
        // throw new Error("error prueba")
        return clientes
    }

    update(id, cliente){
        let indiceCliente=clientes.findIndex(c=>c.id==id)
        if(indiceCliente==-1) throw new Error(`Cliente inexistente: ${id}`)

        clientes[indiceCliente]=cliente
    }
}