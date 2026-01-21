import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from "bcrypt"
import crypto from "crypto"
import { config } from './config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

let prueba="clavetextoplano"
let hash=crypto.createHmac("sha256", config.SECRET).update(prueba).digest("hex")
console.log({prueba, hash})

const salt=10
export const createHash=password=>bcrypt.hashSync(password, salt)
export const validaPass=(password, hash)=>bcrypt.compareSync(password, hash)
