
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

//create post
router.post("/", async function(req, res){
    try{
        const postData = await Post.create({
            ...req.body,
            userId: USER_ID,
        });

        res.json(postData);
    }catch(err){
        res.status(500).json(err);
    }
    res.json({message:"Posted"})
})

module.exports = router;