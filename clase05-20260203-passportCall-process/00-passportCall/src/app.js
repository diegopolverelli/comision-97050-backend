import express from 'express';
import fs from 'fs'
import bcrypt from "bcrypt"
import passport from 'passport';
import { configPassport } from './config/passport.config.js';
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import { config } from './config/config.js';
import { passportCall } from './utils.js';
import { auth, isAdmin, isUser } from './auth/auth.js';

const PORT = config.PORT;

const app = express();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// paso 2
configPassport()
app.use(passport.initialize())
// app.use(passport.session())  // solo si usamos sessions

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

app.post(
    '/login',
    // passport.authenticate("login", { session: false }),
    passportCall("login"), 
    (req, res) => {
        // let {email, password}=req.body
        // if(!email || !password) return res.status(400).send({error:'Ingrese email y password'})

        // usuarios=JSON.parse(fs.readFileSync('./src/usuarios.json','utf8'))

        // let usuario=usuarios.find(u=>u.email===email)
        // if(!usuario) return res.status(400).send({error:`Error credenciales`})

        // if(!bcrypt.compareSync(password, usuario.password)) return res.status(400).send({error:`Error credenciales`})

        let usuario = req.user

        // eliminar info sensible
        delete usuario.password

        // .lean()
        let token = jwt.sign(usuario, config.SECRET, { expiresIn: 60 * 15 })

        res.cookie("cookietoken", token)
        return res.status(200).json({
            usuarioLogueado: usuario,
        })

    }
)

app.get('/usuario',
    // passport.authenticate("current", { session: false }),
    passportCall("current"), 
    // isUser, 
    auth(["User", "premium"]),
    (req, res) => {


        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            mensaje: 'Perfil usuario ' + req.user.nombre,
        });
    }
);

app.get('/inicio',
    // passport.authenticate("current", { session: false }),
    passportCall("current"), 
    // isUser, 
    auth(["Public"]),
    (req, res) => {


        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            mensaje: 'Perfil usuario ' + req.user.nombre,
        });
    }
);

app.get('/admin',
    // passport.authenticate("current", { session: false }),
    passportCall("current"), 
    // isAdmin, 
    auth(["admin", "root"]),
    (req, res) => {


        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            mensaje: 'Perfil admin ' + req.user.nombre,
        });
    }
);


// app.get('/protected', function (req, res, next) {
//     passport.authenticate('local', function (err, user, info, status) {
//         if (err) { return next(err) }   // que hacer si se retorna un done(error)
//         if (!user) { return res.redirect('/signin') } // que hacer si se retorna un done(null, false)  
//         res.redirect('/account');  // que hacer si se retorna un done(null, usuario)
//     })(req, res, next);
// });


const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});
