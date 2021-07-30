const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

//create comment
router.post("/:id", async function(req, res){
    try{
        const commentData = await Comment.create({
            ...req.body,
            userId: USER_ID,
            postId: req.params.id,
        });

        res.json(commentData);
    }catch(err){
        res.status(500).json(err);
    }
    res.json({message:"Posted"})
})

module.exports = router;