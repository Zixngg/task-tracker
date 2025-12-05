const express = require('express');
const router = express.Router();
const controller = require('../controllers/rewardController');

router.get('/', controller.readAllReward);

router.get('/:reward_id', controller.readRewardById);

module.exports = router;