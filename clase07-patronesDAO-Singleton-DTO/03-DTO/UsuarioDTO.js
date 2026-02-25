export class UsuarioDTO{
    constructor(usuario){
        this.firstName=usuario.nombre.toUpperCase()
        this.lastName=usuario.apellido.toUpperCase()
        this.email=usuario.email
        this.fullName=`${this.firstName} ${this.lastName}`
        this.role="user", 
        this.username=usuario.email.split("@")[0]
    }
}

