import express from 'express';
import { router as productsRouter } from './routes/productsRouter.js';
import { router as customersRouter } from './routes/CustomersRouter.js';
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/products", productsRouter)
app.use("/api/customers", customersRouter)

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
