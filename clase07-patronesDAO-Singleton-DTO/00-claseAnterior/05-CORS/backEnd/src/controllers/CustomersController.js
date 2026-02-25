import { customerService } from "../services/index.js";

export const getCustomers=async(req, res)=>{

    // let customers="clientes"
    let customers=await customerService.getCustomers()


    try {
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:customers});        
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`internal server error`})
    }
}

export const createCustomer=async(req, res)=>{
    let {name}=req.body
    // validaciones

    try {
        // let nuevoCliente={name, id:1}
        let nuevoCliente=await customerService.createCustomer({name, })
        res.setHeader('Content-Type','application/json');
        return res.status(201).json({payload:nuevoCliente});        
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`internal server error`})
    }
}