const express=require('express');
const app=express();
const path=require('path');

const port=8080

app.use(express.static(path.join(__dirname,"/public/css")))
app.use(express.static(path.join(__dirname,"/public/js")))
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))

app.get("/",(req,res)=>{
    res.render("home.ejs")
})

// app.get("/ig/:username",(req,res)=>{
//     const followers=["John","Jane","Doe","Smith"]   
//     let {username}=req.params
//     res.render("instagram.ejs",{username,followers})
// })

app.get("/ig/:username",(req,res)=>{
    let {username}=req.params
    const instaData = require("./data.json")
    const data = instaData[username]

    if(data){
        res.render("instagram1.ejs",{data})
    }else{
        res.render("error.ejs")
    }
})


app.get("/hello",(req,res)=>{
    res.send("Hello World")
})

app.get("/rolldice",(req,res)=>{
    let diceVal=Math.floor(Math.random()*6)+1
    res.render("rolldice.ejs",{ num:diceVal })  
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})