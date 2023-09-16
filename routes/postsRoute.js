const { Router } = require('express');
const router = Router();
const verifyToken = require('../middleware/authenticator');
const { getFeedPosts, getUserPosts, likePost } = require('../controllers/posts');



router.route('/posts')
.get(verifyToken, getFeedPosts)


router.route('/posts/:userId/posts')
.get(verifyToken, getUserPosts)



router.route("/posts/:id/like")
.patch(verifyToken, likePost)




module.exports = router;
