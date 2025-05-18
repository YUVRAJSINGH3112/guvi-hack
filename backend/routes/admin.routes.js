const express =require('express');
const router = express.Router();
const adminController = require('../controller/user.controllers');


router.post('/login', adminController.login);
router.get('/logout', adminController.logout);
router.get('/profile', adminController.profile);

module.exports = router;