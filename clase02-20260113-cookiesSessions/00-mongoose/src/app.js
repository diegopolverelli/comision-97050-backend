import express from 'express';
import { logger } from './middlewares/logger.js';
import { validate } from './middlewares/validate.js';
import { auth } from './middlewares/auth.js';

import { router as productsRouter } from './routes/products.router.js';
import { router as clientsRouter } from './routes/clients.router.js';
import { connDB } from './config/db.js';
import { config } from './config/config.js';
// import http from "http"
const PORT=config.general.PORT;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(logger)
app.use("/api/products", productsRouter)
app.use("/api/clients", clientsRouter)

app.get('/',(req,res)=>{
    // let {nombre, email}=req.body

    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.get('/api/datos', auth, (req,res)=>{
    // console.log(req.headers)


    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Datos...!!!"});
})

app.post('/api/nombre', validate, (req,res)=>{
    let {nombre}=req

    res.setHeader('Content-Type','application/json');
    return res.status(201).json({payload:"Nombre: "+nombre});
})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});


connDB(
    config.database.MONGO_URL, 
    config.database.DB_NAME
)