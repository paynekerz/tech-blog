const { Post, User } = require("../models");

const router = require("express").Router();

router.get("/", async function(req, res){
    try{
        let posts = await Post.findAll({
            include: [{model: User}],
            limit: 10,
        });
        posts = posts.map((post) => post.get())
        res.render("all-posts", {
            posts,
            logged_in: req.session.logged_in,
        })
    }catch(err){
        res.status(500).json(err);
    }
})
router.get("/login", function(req, res){
    if(req.session.logged_in){
        return res.redirect("/");
    }
    res.render("login")
})

router.get("/signup", function(req, res){
    if(req.session.logged_in){
        return res.redirect("/");
    }
    res.render("signup")
})

router.get("/post/:id", async function(req, res){
    try{
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {model: User,  attributes: ["username"]},  
                {model: Comment, include: [{model: User}]}
            ]
        });
        res.render("solo-post"), {
            post: postData, 
            logged_in: req.session.logged_in,
        };
    }catch(err){
        res.status(500).json(err);
    }
})

router.get("/dashboard", async function(req, res){
    try{
        const postData = Post.findAll({where: {userId: req.session.user_id}})
        res.render("post-admin", {
            layout: "dashboard",
            logged_in: req.session.logged_in,
        })
    }
    catch(err){
        res.status(500).json(err)
    }
})
router.get("/dashboard/new", function(req, res){
    res.render("new-post", {
        layout: "dashboard",
        logged_in: req.session.logged_in,
    })
})

module.exports = router;