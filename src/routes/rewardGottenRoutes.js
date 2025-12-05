const express = require('express');
const router = express.Router();
const controller = require('../controllers/rewardGottenController');

router.get('/', controller.readAllRewardGotten);

router.get('/:rewardGotten_id', controller.readRewardGottenById);
router.get('/users/:user_id', controller.rewardGottenByUserId);

module.exports = router;