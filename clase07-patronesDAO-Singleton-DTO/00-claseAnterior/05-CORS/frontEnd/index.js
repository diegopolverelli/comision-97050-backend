const divDatos=document.getElementById("divDatos")
const btnDatos=document.getElementById("btnDatos")
const divDatos2=document.getElementById("divDatos2")
const btnDatos2=document.getElementById("btnDatos2")

btnDatos.addEventListener("click", async(e)=>{

    e.preventDefault()

    try {
        const response=await fetch("http://localhost:3000/api/products")
        if(response.status>=400){
            const {error}=await response.json()
            divDatos.textContent=`Error: ${error}`
            return            
        }
        const {productos}=await response.json()
        divDatos.textContent=JSON.stringify(productos)
        return
    } catch (error) {
        divDatos.textContent=`Error catch: ${error.message}`
        return
    }

})


btnDatos2.addEventListener("click", async(e)=>{

    e.preventDefault()

    try {
        const response=await fetch("http://localhost:3000/api/customers")
        if(response.status>=400){
            const {error}=await response.json()
            divDatos2.textContent=`Error: ${error}`
            return            
        }
        const {clientes}=await response.json()
        divDatos2.textContent=JSON.stringify(clientes)
        return
    } catch (error) {
        divDatos2.textContent=`Error catch: ${error.message}`
        return
    }

})