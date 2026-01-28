import express from 'express';
import fs from 'fs'
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import bcrypt from "bcrypt"
import { auth } from './middleware/auth.js';
import { iniciarPassport } from './config/passport.config.js';
import passport from 'passport';

const PORT = 3000;

const app = express();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"))

// paso 2
iniciarPassport()
app.use(passport.initialize())
// app.use(passport.session())   // solo si uso sessions

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('OK');
})

let usuarios = []
if (fs.existsSync('./src/usuarios.json')) {
    usuarios = JSON.parse(fs.readFileSync('./src/usuarios.json', 'utf-8'))
}

app.post('/registro', (req, res) => {
    let { nombre, email, password } = req.body
    if (!nombre || !email || !password) return res.status(400).send({ error: 'Ingrese todos los datos' })

    let usuario = usuarios.find(u => u.email === email)
    if (usuario) return res.status(400).send({ error: `El usuario ${email} ya existe en la DB` })

    let id = 1
    if (usuarios.length > 0) id = usuarios[usuarios.length - 1].id + 1

    usuario = {
        id,
        nombre,
        email,
        password: bcrypt.hashSync(password, 10),
        rol: "user"
    }

    usuarios.push(usuario)

    fs.writeFileSync('./src/usuarios.json', JSON.stringify(usuarios, null, 5))

    res.json({
        usuarioCreado: usuario
    })
})

app.post('/login', (req, res) => {
    let { email, password } = req.body
    if (!email || !password) return res.status(400).send({ error: 'Ingrese email y password' })

    usuarios = JSON.parse(fs.readFileSync('./src/usuarios.json', 'utf8'))

    let usuario = usuarios.find(u => u.email === email)
    if (!usuario) return res.status(400).send({ error: `Error credenciales` })

    if (!bcrypt.compareSync(password, usuario.password)) return res.status(400).send({ error: `Error credenciales` })

    // eliminar datos sensibles del usuario
    delete usuario.password

    // req.session.usuario=usuario
    let token = jwt.sign(usuario, "CoderCoder123", { expiresIn: 60 * 15 })

    res.cookie("tokencookie", token, { httpOnly: true })
    return res.status(200).json({
        usuarioLogueado: usuario,
        // token
    })

})

app.get("/logout", (req, res) => {

    res.clearCookie("tokencookie")
    res.status(200).json({ message: "Logout exitoso" })
})

app.get("/error", (req, res)=>{
    res.setHeader('Content-Type','application/json');
    return res.status(401).json({error:`Error al autenticar`})
})

app.get(
    '/usuario',
    // auth,
    passport.authenticate("current", {session: false, failureRedirect:"/error"}),
    (req, res) => {

        // si passport.authenticate sale bien, 
        // deja un req.user con datos del usuario

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            mensaje: 'Perfil usuario ' + req.user.nombre,
        });
    }
);

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});
