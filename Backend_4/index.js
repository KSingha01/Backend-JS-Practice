const express = require('express');
const app = express();
const port=8080
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');


app.set('view engine', 'ejs');
app.set("views",path.join(__dirname,"views"));
app.use(methodOverride('_method')); // Middleware to override HTTP methods

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data

let posts=[
    {
        id:uuidv4(),
        username:"Ram",
        content:"I love coding"
    },
    {
        id:uuidv4(),
        username:"kunal",
        content:"Hard work is the key to success"
    },
    {
        id:uuidv4(),
        username:"diya",
        content:"I love to travel"
    }
];


app.get('/posts', (req, res) => {
    res.render('index.ejs',{ posts });
})

app.get('/posts/new', (req, res) => {
    res.render("new.ejs")
})

app.post('/posts', (req, res) => {
    let { username, content } = req.body;
    let id=uuidv4();
    posts.push({ id, username, content });
    res.redirect('/posts'); // Redirect to the posts page after adding a new post   
})

app.get('/posts/:id', (req, res) => {
    let { id } = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
})

app.patch('/posts/:id', (req, res) => {
    let { id }=req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post)
    res.redirect('/posts'); // Redirect to the posts page after updating the post
})

app.get('/posts/:id/edit', (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id); 

    res.render("edit.ejs", { post }); 
})


app.delete('/posts/:id', (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id); 

    res.redirect('/posts'); 
})



app.listen(port, () => {
    console.log(`Server is running on port :${port}`);
})