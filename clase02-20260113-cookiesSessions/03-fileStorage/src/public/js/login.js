const divMensaje=document.getElementById("mensaje")
const inputEmail=document.getElementById("email")
const inputPass=document.getElementById("password")
const btnSubmit=document.getElementById("btnSubmit")

btnSubmit.addEventListener("click", async(e)=>{

    e.preventDefault()

    let email=inputEmail.value 
    let password=inputPass.value  

    // validaciones
    if(!email || !password){
        divMensaje.textContent=`complete los datos`
        setTimeout(() => {
            divMensaje.textContent=""
        }, 3000);
        return 
    }

    let response=await fetch("/login", {
        method:"post", 
        headers: {
            "Content-Type":"application/json"
        }, 
        body: JSON.stringify({email, password})
    })
    if(response.status>=400){
        divMensaje.textContent=`Error en login`
        return 
    }

    let {usuario}=await response.json()
    divMensaje.textContent=`Login exitoso para ${usuario.nombre}`
    

})