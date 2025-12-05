const express = require('express');
const router = express.Router();
const controller = require('../controllers/questProgressController');

router.get('/', controller.readAllQuestProgress);
router.post('/', controller.checkUser_id, controller.checkQuest_id, controller.randomReward, controller.retrieveRewardNameDesc, controller.createNewQuestProgress);

router.get('/:questProgress_id', controller.readQuestProgressById);

module.exports = router;