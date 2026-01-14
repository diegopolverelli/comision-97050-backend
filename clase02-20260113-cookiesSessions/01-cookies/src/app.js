import express from 'express';
import cookieParser from "cookie-parser"
const PORT=3000;

const app=express();

app.use(cookieParser("coderCoder123"))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('./src/public'))

app.get('/',(req,res)=>{


    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.get('/setcookies',(req,res)=>{

    let datos={
        theme:"dark", 
        fontSize: 16, 
        color: "blue"
    }

    res.cookie("cookie01", datos, {})
    res.cookie("cookie02conVto01", datos, {maxAge: 1000 * 5, })
    res.cookie("cookie02conVto02", datos, {expires: new Date(2026, 1, 2) })
    res.cookie("cookie03conVtoSigned", datos, {expires: new Date(2026, 1, 10), signed:true })

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"cookies seteadas"});
})

app.get("/getcookies", (req, res)=>{

    let cookies=req.cookies
    let cookiesFirmadas=req.signedCookies

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:{
        cookies, 
        cookiesFirmadas
    }});
})

app.get("/delcookies", (req, res)=>{
    // res.clearCookie("cookie01")

    let cookies=Object.keys(req.cookies)
    cookies.forEach(c=>res.clearCookie(c))

    cookies=Object.keys(req.signedCookies)
    cookies.forEach(c=>res.clearCookie(c))


    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"cookies eliminadas...!!!"});
})



const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
