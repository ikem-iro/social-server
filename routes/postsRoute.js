const { Router } = require('express');
const router = Router();
const verifyToken = require('../middleware/authenticator');
const { getFeedPosts, getUserPosts, likePost } = require('../controllers/posts');



router.route('/')
.get(verifyToken, getFeedPosts)


router.route('/:userId/posts')
.get(verifyToken, getUserPosts)



router.route("/:id/like")
.patch(verifyToken, likePost)




module.exports = router;
