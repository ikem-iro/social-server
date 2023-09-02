const { Router } = require('express');

const router = Router();


const { getUser, getUserFriends, addRemoveFriend } = require('../controllers/users');

const verifyToken = require('../middleware/authenticator');


router.route("/:id")
.get(verifyToken, getUser)


router.route("/:id/friends")
.get(verifyToken, getUserFriends)


router.route("/:id/:friendId")
.patch(verifyToken, addRemoveFriend)




module.exports = router;