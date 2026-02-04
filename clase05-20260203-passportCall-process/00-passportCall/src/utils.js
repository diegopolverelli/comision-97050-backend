import {fileURLToPath} from 'url';
import { dirname } from 'path';
import passport from 'passport';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const passportCall=estrategia=>{
    return function (req, res, next) {
        passport.authenticate(estrategia, function (err, user, info, status) {
            if (err) { return next(err) }   // que hacer si se retorna un done(error)
            if (!user) {
                // return res.redirect('/signin')
                return res.status(401).json({message: info.message?info.message:info.toString()})
            } // que hacer si se retorna un done(null, false)  
            // res.redirect('/account');  // que hacer si se retorna un done(null, usuario)
            req.user=user, 
            next()
        })(req, res, next);
    }
}



