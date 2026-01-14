import mongoose from "mongoose"

export const connDB=async(url, dbName)=>{
    try {
        await mongoose.connect(url, {dbName})
        console.log(`DB online...!!!`)
    } catch (error) {
        console.log(`Error al conectar a DB`)
    }
}