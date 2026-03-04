import nodemailer from "nodemailer"

process.loadEnvFile("./.env")

const transport=nodemailer.createTransport(
    {
        // host: "mail.miempresa.com",
        service: "gmail", 
        port: 587, 
        auth: {
            user: process.env.MAIL_ACCOUNT, 
            pass: process.env.MAIL_PASS,
        }
    }
)

export const enviarmail=()=>{
    return transport.sendMail({
        from: `Diego Polverelli diegopolverelli@gmail.com`, 
        to: `diegopolverelli@hotmail.com, diepol@yahoo.com`,
        // cc: `pepehotmail.com`, 
        subject: `Mail prueba con adjuntos`, 
        // text: `Prueba...!!!`, 
        html: `<h2>Prueba mail con adjuntos...!!!</h2>
        <p><strong style="color:blue;">Prueba párrafo</strong></p>
        `, 
        attachments: [
            {
                path: "./images/diego10.jpg", 
                filename: "diegote.jpg",
            },
            {
                path: "./images/lio.jpg", 
                filename: "lio.jpg",
            },
            {
                path: "./images/lio2.jpg", 
                filename: "lio2.jpg",
            },
        ],        
    })
}


enviarmail()
    .then(res=>{
        if(res.rejected.length>0){
            console.log(`Problemas con el envío de algún mail... `)
        }else{
            console.log(`Correos enviados...!!!`)
            // console.log(res)
        }
    })
    .catch(e=>{
        console.log(`Error: ${e.message}`)
    })