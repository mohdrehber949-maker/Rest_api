const express = require("express");
const path = require ("path");
const app = express();
const { v4: uuidv4 } = require ('uuid');
const methodOverride = require('method-override')

app.use(methodOverride('_method'))

const port = 8080;


app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/views"));

app.use(express.urlencoded({extended: true})); 
app.use(express.static (path.join(__dirname, "public")));


let posts = [
    {
        id: uuidv4(),
        username: "Raca",
        content: "Hard work is important to achieve success",
    },
    {
        id: uuidv4(),
        username: "David",
        content: "Eaxy work is important to achieve success",
    },
];


app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
});
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let {username, content} = req.body;
    let  id  = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts")
})

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    let updatedContent = req.body.content;
    post.content = updatedContent;
    console.log(post);
    res.redirect("/posts")
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("edit.ejs", {post});
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts");
})

app.listen(port, () => {
    console.log(`Server is running on port no. ${port}`);
});