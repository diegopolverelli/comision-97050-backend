import fs from "fs"
// console.log("hola")


console.log(`pid: `, process.pid)
console.log(`datos de memory: `, process.memoryUsage())
console.log(`cwd: `, process.cwd())
console.log(`platform`, process.platform)


console.log("variables de entorno", process.env)
console.log("variable de entorno PRUEBA_PORT", process.env.PRUEBA_PORT)
console.log("variable de entorno PRUEBA_SECRET", process.env.PRUEBA_SECRET)


console.log("argumentos x consola:", process.argv)

// let {}=req.body
// let [rutaNode, rutaScrit, ...argumentos]=process.argv  // ... son el operador REST
let [ , , ...argumentos]=process.argv  // ... son el operador REST

let indicePort
indicePort=argumentos.findIndex(a=>a=="--port")
if(indicePort==-1){
    console.log(`Error: debe indicar el flag --port <PORT>`)
    process.exit()  // mata el proceso
}


import express from 'express';
// const PORT=3000;
const PORT=argumentos[indicePort+1];

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
