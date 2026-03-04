import { MemoryClientesDAO } from "../dao/MemoryClientesDAO.js";
import { MemoryProductosDAO } from "../dao/MemoryProductosDAO.js";
import { MemoryTicketsDAO } from "../dao/MemoryTicketsDAO.js";
import { ClientesRepository } from "../Repository/Clientes.repository.js";
import { ProductosRepository } from "../Repository/ProductosRepository.js";
import { TicketsRepo } from "../Repository/TicketRepo.js";
import { ClientesService } from "./clientes.service.js";

const ticketsDAO=new MemoryTicketsDAO()
const ticketsRepo=new TicketsRepo(ticketsDAO)

const productosDAO=new MemoryProductosDAO()
const productosRepo=new ProductosRepository(productosDAO)

const clientesDAO=new MemoryClientesDAO()
const clientesRepo=new ClientesRepository(clientesDAO)
export const clientesService=new ClientesService(clientesRepo, productosRepo, ticketsRepo)