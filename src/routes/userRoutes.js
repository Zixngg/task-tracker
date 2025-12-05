const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware');

router.get('/', controller.readAllUser);
router.post('/', controller.uniqueEmail, controller.createNewUser);

router.get('/:user_id', controller.readUserById);
router.put('/:user_id', controller.uniqueEmail, controller.uniqueUsername, controller.updateUserById);
router.delete('/:user_id', controller.deleteUserById);

router.post("/register", controller.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, controller.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/login", controller.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

module.exports = router;