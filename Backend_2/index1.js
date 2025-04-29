const express=require('express');
const app=express()

let port=8080

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

app.get('/',(req,res)=>{
    res.send("You contacted root path")
})

app.get('/:username/:id',(req,res)=>{
    let { username, id }=req.params
    res.send(`Welcome to the page of @${username}`)
})

app.get("/search",(req,res)=>{
    //console.log(req.query)
    //res.send("No result")
    let { q }=req.query  // we can also send html code
    res.send(`seach result for query :${q}`)
})