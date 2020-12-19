const express = require('express');
const controller = require('./controller/controller.js');
const authController = require('./controller/authController.js');
const userToLocals = require('./middleware/userLocals.js');

const router = express.Router();

router.use(userToLocals);

router.get('/', controller.homePage);
router.get('/search', controller.searchPage);

router.get('/login', authController.login);
router.post('/login', authController.sendLoginForm);

router.get('/subscribe', authController.subscribe);
router.post('/subscribe', authController.sendSubscribeForm);

router.get('/profil', authController.profil)


module.exports = router;