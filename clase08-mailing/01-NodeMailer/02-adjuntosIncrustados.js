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
        subject: `Mail prueba con adjuntos incrustados`, 
        // text: `Prueba...!!!`, 
        html: `<h2>Prueba mail con adjuntos incrustados...!!!</h2>
        <img src="cid:img01" width="300"/>
        <p><strong style="color:red;">Imagenes varias</strong></p>
        <img src="cid:img02" width="300"/>
        <img src="cid:img03" width="300"/>
        <p><strong style="color:blue;">Prueba párrafo</strong></p>
        `, 
        attachments: [
            {
                path: "./images/diego10.jpg", 
                filename: "diegote.jpg",
                cid: "img01",
            },
            {
                path: "./images/lio.jpg", 
                filename: "lio.jpg",
                cid: "img02",
            },
            {
                path: "./images/lio2.jpg", 
                filename: "lio2.jpg",
                cid: "img03",
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