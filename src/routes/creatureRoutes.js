const express = require('express');
const router = express.Router();
const controller = require('../controllers/creatureController');

router.get('/', controller.readAllCreature);

router.get('/:creature_id', controller.readCreatureById);
router.post('/:creature_id/users/:user_id', controller.checkCreatureId, controller.checkUserId, controller.retrieveCreatureNameDesc, controller.checkPointsAndBuyCreature);

module.exports = router;