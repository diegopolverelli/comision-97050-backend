const divMensaje=document.getElementById("mensaje")
const inputEmail=document.getElementById("email")
const inputPassword=document.getElementById("password")
const btnSubmit=document.getElementById("btnSubmit")


btnSubmit.addEventListener("click", async(e)=>{
    e.preventDefault()

    let email=inputEmail.value 
    let password=inputPassword.value 

    if(!email || !password){
        divMensaje.textContent=`Complete email y password...!!!`
        setTimeout(() => {
            divMensaje.textContent=""
        }, 3000);
        return 
    }

    // resto validaciones pertinentes

    const response=await fetch("/api/sessions/login", 
        {
            method:"post", 
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({email, password})
        }
    )
    if(response.status>=400){
        let {error}=await response.json()
        divMensaje.textContent=`Error: ${error}`
        setTimeout(() => {
            divMensaje.textContent=""
        }, 3000);
        return 
    }

    let {message, usuario}=await response.json()
    window.location.href=`/perfil?mensaje=${message} - Usuario logueado: ${usuario.nombre}`

})