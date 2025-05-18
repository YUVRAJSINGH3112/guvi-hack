const express =require('express');
const router = express.Router();
const userController = require('../controller/user.controllers');


router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/profile', userController.profile);

module.exports = router;