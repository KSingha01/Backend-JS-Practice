const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path=require('path');
const methodOverride = require('method-override');


app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"/views"))


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: '1234',
});

let getRandomUser = () => {
    return [
      faker.string.uuid(),
      faker.internet.username(), 
      faker.internet.email(),
      faker.internet.password(),
    ];
 }

//Home Route
app.get("/",(req,res) => {
    let q=`SELECT COUNT(*) FROM users`;
    try{
        connection.query(q,(err, result) => {
            if (err) throw err;
            let count = result[0]["COUNT(*)"];
            res.render("home.ejs",{count})
        })
        }catch(err){
            console.log(err);
            res.send("Some error in DB")
        }
})

//Show Route
app.get("/show",(req,res) => {
    let q = "SELECT * FROM users";
    try{
        connection.query(q,(err, users) => {
            if (err) throw err;
            //res.send(result);
            res.render("showusers.ejs",{users})
        })
        }catch(err){
            console.log(err);
            res.send("Some error in DB")
        }
})

//EDIT Route
app.get("/user/:id/edit",(req,res)=>{
    let { id } = req.params;
    let q = `SELECT * FROM users WHERE id = '${id}'`;
    
    try{
        connection.query(q,(err, result) => {
            if (err) throw err;
            let user = result[0];
            res.render("edit.ejs",{user})
        });
        }catch(err){
            console.log(err);
            res.send("Some error in DB")
        }
})

//UPDATE Route
app.patch("/user/:id",(req,res)=>{
    let { id } = req.params;
    let {password: formPass, username: newUsername} = req.body;

    let q = `SELECT * FROM users WHERE id = '${id}'`;
    
    try{
        connection.query(q,(err, result) => {
            if (err) throw err;
            let user = result[0];
            
            if(formPass != user.password){
                res.send("Password is incorrect")
            }else{
                let q2=`UPDATE users SET username='${newUsername}' WHERE id='${id}'`;
                connection.query(q2,(err, result) => {
                    if (err) throw err;
                    res.redirect("/show");
                })
            }
        });
        }catch(err){
            console.log(err);
            res.send("Some error in DB")
        }
})

//INSERT NEW USER Button
app.get("/user/new",(req,res)=>{
    res.render("new.ejs")
})

// Route to handle form submission and insert a new user
app.post("/user", (req, res) => {
    let { username, email, password } = req.body;
    let id = faker.string.uuid(); // Generate a unique ID for the new user

    // Check if the email already exists
    let checkQuery = "SELECT * FROM users WHERE email = ?";
    connection.query(checkQuery, [email], (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Error checking email in the database");
        }

        if (result.length > 0) {
            // Email already exists
            return res.send("Error: Email already in use");
        }

        // Insert the new user if the email does not exist
        let insertQuery = "INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)";
        connection.query(insertQuery, [id, username, email, password], (err, result) => {
            if (err) {
                console.log(err);
                return res.send("Error inserting user into the database");
            }
            res.redirect("/show"); // Redirect to the list of users after successful insertion
        });
    });
});


//DELETE Route
app.get("/user/delete", (req, res) => {
    // Example user object (replace this with actual user data from your database)
    let user = { username: "exampleUser" }; // Replace with actual user data
    res.render("delete.ejs", { user });
});



app.delete("/user/delete", (req, res) => {
    let { email, password } = req.body;

    // Query to get the user by email
    let getUserQuery = "SELECT * FROM users WHERE email = ?";
    connection.query(getUserQuery, [email], (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Error fetching user from the database");
        }

        if (result.length === 0) {
            return res.send("Error: User not found");
        }

        let user = result[0];

        // Validate the password
        if (user.password !== password) {
            return res.send("Error: Incorrect password");
        }

        // Query to delete the user
        let deleteQuery = "DELETE FROM users WHERE email = ?";
        connection.query(deleteQuery, [email], (err, result) => {
            if (err) {
                console.log(err);
                return res.send("Error deleting user from the database");
            }
            res.redirect("/show"); // Redirect to the list of users after deletion
        });
    });
});


app.listen("8080",()=>{
    console.log("Server is running on port 8080")
})




// let q="INSERT INTO users (id, username, email, password) VALUES ?";

// let data = [];

// for(let i=1;i<=100;i++){
//     data.push(getRandomUser())
// }

// try{
//     connection.query(q, [data],(err, result) => {
//         if (err) throw err;
//         console.log(result);
//     })
// }catch(err){
//     console.log(err);
// }

// connection.end();