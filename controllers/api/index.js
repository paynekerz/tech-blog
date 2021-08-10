const router = require('express').Router();

const user = require('./user');
const post = require('./post');

router.use('/users', user);
router.use('/posts', post);

module.exports = router;
