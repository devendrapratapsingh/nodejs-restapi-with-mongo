const express = require('express')
const router = express.Router();
const userController = require('../controllers/user')
const checkAuth = require('../auth-gaurd/check-auth')
router.post('/signup',userController.user_signup)
router.post('/login', userController.user_login);
router.delete('/:id',checkAuth,userController.user_delete);
module.exports = router;