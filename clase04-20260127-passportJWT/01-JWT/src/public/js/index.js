const inputEmail=document.getElementById("email")
const inputPassword=document.getElementById("password")
const btnSubmit=document.getElementById("btnSubmit")

const divMensaje=document.getElementById("mensaje")

const divDatos=document.getElementById("datos")
const btnDatos=document.getElementById("btnDatos")

btnSubmit.addEventListener("click", async(e)=>{
    e.preventDefault()

    let email=inputEmail.value 
    let password=inputPassword.value 
    if(!email || !password){
        divMensaje.textContent="Complete email y password"
        return 
    }

    const response=await fetch("/login", {
        method:"post", 
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({email, password})
    })
    if(response.status>=400){
        let {error}=await response.json()
        divMensaje.textContent=error
        return
    }

    let {usuarioLogueado, token}=await response.json()
    localStorage.setItem("token", token)
    divMensaje.textContent=`Login exitoso para ${usuarioLogueado.nombre}`
})

btnDatos.addEventListener("click", async(e)=>{
    e.preventDefault()

    const response=await fetch("/usuario", {
        headers: {
            authorization: `BEARER ${localStorage.getItem("token")}`
        }
    })
    if(response.status>=400){
        let {error}=await response.json()
        divDatos.textContent=error
        return 
    }
    let {mensaje}=await response.json()
    divDatos.textContent=mensaje
})