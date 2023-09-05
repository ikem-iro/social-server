const { Router } = require('express');

const router = Router();


const { getUser, getUserFriends, addRemoveFriend } = require('../controllers/users');

const verifyToken = require('../middleware/authenticator');


router.route("/users/:id")
.get(verifyToken, getUser)


router.route("/users/:id/friends")
.get(verifyToken, getUserFriends)


router.route("/users/:id/:friendId")
.patch(verifyToken, addRemoveFriend)




module.exports = router;