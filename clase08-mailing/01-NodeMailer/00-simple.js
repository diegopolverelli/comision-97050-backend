// dwjp fvmp nqiu ksjg

import nodemailer from "nodemailer"

const transporter=nodemailer.createTransport(
    {
        // host: "smpt.miempresa.com", 
        service: "gmail", 
        port: 587, 
        auth: {
            user: "diegopolverelli@gmail.com", 
            pass: "contraseña de aplicaciones de google"
        },
    }
)

// transporter.sendMail()

export const enviarMail=()=>{
    return transporter.sendMail(
        {
            from: `Diego Polverelli diegopolverelli@gmail.com`, 
            to: `diegopolverelli@hotmail.com, diepol@yahoo.com`,
            // cc: `pepehotmail.com`, 
            subject: `Mail prueba simple`, 
            // text: `Prueba...!!!`, 
            html: `<h2>Prueba mail simple...!!!</h2>
            <p><strong style="color:blue;">Prueba párrafo</strong></p>
            `
        }
    )
}


enviarMail()
    .then(res=>{
        if(res.rejected.length>0){
            console.log(`Problemas con el envío de algún mail... `)
        }else{
            console.log(`Correos enviados...!!!`)
            console.log(res)
        }
    })
    .catch(e=>{
        console.log(`Error: ${e.message}`)
    })