import { CustomersDAO } from "../dao/CustomersDAO.js";
import { ProductsDAO } from "../dao/ProductsDAO.js";
import { CustomersService } from "./Customers.service.js";
import { ProductsService } from "./Products.service.js";


const productsDAO=ProductsDAO
export const productsService=new ProductsService(productsDAO)


const customersDAO=new CustomersDAO()
export const customerService=new CustomersService(customersDAO)