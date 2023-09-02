const { Router } = require('express');
const router = Router();

const { login } = require('../controllers/auth');


router.route('/login')
.post(login)




module.exports = router;