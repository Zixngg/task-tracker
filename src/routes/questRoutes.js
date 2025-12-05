const express = require('express');
const router = express.Router();
const controller = require('../controllers/questController');

router.get('/', controller.readAllQuest);

router.get('/:quest_id', controller.readQuestById);

module.exports = router;