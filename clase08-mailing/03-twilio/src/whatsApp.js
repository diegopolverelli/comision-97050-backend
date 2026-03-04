import twilio from "twilio"
process.loadEnvFile("./.env")
const accountSid = process.env.ACCOUNT_SID_TWILIO;
const authToken = process.env.APIKEY_TWILIO;
const client = twilio(accountSid, authToken);

client.messages
    .create({
        from: 'whatsapp:+14155238886',
        body: "Hola...!!!",
        // contentSid: 'HXd6791e937f854dbd9903503b2e319955',
        // contentVariables: '{"name":"Pedro"}',
        to: 'whatsapp:+5491154200776'
    })
    .then(message => console.log(message.sid))
    .catch(e => console.log(`Se produjo un error al enviar el mensaje: ${e.message}`))