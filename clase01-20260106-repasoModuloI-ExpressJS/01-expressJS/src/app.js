import express from 'express';
// import http from "http"
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    // let {nombre, email}=req.body

    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.get('/api/datos',(req,res)=>{
    console.log(req.headers)


    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Datos...!!!"});
})

app.post('/api/nombre',(req,res)=>{


    res.setHeader('Content-Type','application/json');
    return res.status(201).json({payload:"Nombre...!!!"});
})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
