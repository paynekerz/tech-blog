const { Post } = require("../models");

const router = require("express").Router();

router.get("/", async function(req, res){
    try{
        let posts = await Post.findAll({
            limit: 10,
        });
        posts = posts.map((post) => post.get())
        res.render("all-posts", {
            posts,
        })
    }catch(err){
        res.status(500).json(err);
    }
})
router.get("/login", function(req, res){
    res.render("login")
})

router.get("/signup", function(req, res){
    res.render("signup")
})

router.get("/dashboard", function(req, res){
    res.render("post-admin", {
        layout: "dashboard",
    })
})
router.get("/dashboard/new", function(req, res){
    res.render("new-post", {
        layout: "dashboard",
    })
})

module.exports = router;