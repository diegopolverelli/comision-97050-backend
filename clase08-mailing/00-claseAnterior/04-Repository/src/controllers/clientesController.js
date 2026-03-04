// import { MemoryClientesDAO as DAO } from "../dao/MemoryClientesDAO.js"

import { clientesService } from "../service/index.js"

// let clientesService=new DAO()

async function getClientes(req,res){

    try {
        let clientes=await clientesService.getClientes()
    
        res.status(200).json({clientes})
        
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`internal server error`, detalle: error.message})
    }
    // let clientes=await clientesService.get()
}

export default {getClientes}