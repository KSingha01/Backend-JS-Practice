const express=require('express');
const app=express()

//console.dir(app)

let port=8080

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

/*app.use((req,res)=>{
//     //console.log(req)
//     console.log("request received")
//     // res.send({
//     //     name:"apple",
//     //     color:"red",
//     // })
//     let code="<h1>Fruits</h1> <ul> <li>apple</li> <li>orange</li> </ul>"
     res.send(code)
})*/

app.get('/',(req,res)=>{
    res.send("You contacted root path")
})


app.get('/apple',(req,res)=>{
    res.send("You contacted apple path")
})


app.get('/orange',(req,res)=>{
    res.send("You contacted orange path")
})

/*app.get('*', (req, res) => {
    res.send("This path does not exist");
});*/
