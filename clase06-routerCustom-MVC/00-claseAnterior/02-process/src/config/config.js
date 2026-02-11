import dotenv from "dotenv"

let [ , , ...argumentos]=process.argv  // ... son el operador REST

let mode="dev"

let indiceMode
indiceMode=argumentos.findIndex(a=>a=="--mode")
if(indiceMode!=-1){
    mode=argumentos[indiceMode+1]
    if(mode!="prod" && mode!="dev"){
        console.log(`Solo se admiten modes dev y prod`)
        process.exit()
    }
}


dotenv.config(
    {
        path: mode=="prod"?"./.env.prod":"./.env.dev",
        override:true,
        quiet:true,
    }
)

export const config={
    PORT: process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URL,
    DB_NAME: process.env.DB_NAME, 
    SECRET: process.env.SECRET, 
}