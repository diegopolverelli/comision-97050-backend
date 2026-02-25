
// @decorador(parametro1, parametro2)  // forma habitual de encontrar decoradores (en frameworks)
const suma=(a,b)=>{
    return a+b
}

console.log(suma(4,5))


const decoradorLog=fn=>{
    return ( ...argumentos)=>{    // ... son aquí el operador REST 

        console.log(`La funcion ${fn.name} se ha ejecutado el ${new Date().toUTCString()}`)

        return fn(...argumentos)  // ... son aquí el operador SPREAD
    }
}


const sumaConLog=decoradorLog(suma)

console.log(sumaConLog(3, 4))

console.log(suma(4,5))