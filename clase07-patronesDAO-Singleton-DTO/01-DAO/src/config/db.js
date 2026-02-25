import mongoose from "mongoose"

export class Singleton{
    static #instancia
    // static prueba

    constructor(mongoURI, dbName){
        mongoose.connect(mongoURI, {dbName})
    }

    static conectarDB(mongoUri, dbName){
        if(this.#instancia){
            console.log(`conexión previamente establecida...!!!`)
            return this.#instancia
        }

        this.#instancia=new Singleton(mongoUri, dbName)
        console.log(`DB online...!!!`)
        return this.#instancia
    }


}

// Singleton.prueba=true