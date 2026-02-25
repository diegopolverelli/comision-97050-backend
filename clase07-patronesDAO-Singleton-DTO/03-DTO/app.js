import { UsuarioDTO } from "./usuarioDTO.js"

let usuarioReq={
    nombre:"Juan", 
    apellido:"Ramirez", 
    email:"jramirez@test.com",
    password: "123"
}


console.log(usuarioReq)


const userDB=new UsuarioDTO(usuarioReq)
console.log(userDB)

// modelouser.create({firstName:usuarioReq.nombre})