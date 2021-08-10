const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const Auth = require("../utils/auth");

//GET ALL POSTS IN HOME PAGE
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    //Map through the posts and serialize
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET POST BY ID (IF AUTHENTICATED, CAN ADD A COMMENT LATER)
router.get("/posts/:id", Auth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const post = postData.get({ plain: true });
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    if (!req.session.logged_in) {
      res.render("login");
    } else {
      res.render("post", {
        ...post,
        comments,
        logged_in: req.session.logged_in,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//router for user posts
router.get("/dashboard", Auth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const user = userData.get({ plain: true });

    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      ...user,
      posts,
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//route fo rcreateing post page
router.get("/dashboard/create", Auth, async (req, res) => {
  try {
    res.render("create", {
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//route for editing post by id
router.get("/dashboard/edit/:id", Auth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render("edit", {
      ...post,
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//route for signup
router.get("/signup", (req, res) => {
  if (!req.session.logged_in) {
    res.render("signup");
  }
});

//route for login
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

//route for logout
router.get("/logout", (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/");
  }
  res.render("homepage");
});

module.exports = router;
