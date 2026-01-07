export const logger=(req, res, next)=>{
    console.log(`Fecha: ${new Date().toUTCString()} - url: ${req.url} - method: ${req.method}`)

    next()
}