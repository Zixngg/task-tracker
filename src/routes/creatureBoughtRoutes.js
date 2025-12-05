const express = require('express');
const router = express.Router();
const controller = require('../controllers/creatureBoughtController');

router.get('/', controller.readAllCreatureBought);
router.get('/users/:user_id', controller.readCreatureBougthByUserId);

router.put('/:user_id/feed/:creatureBought_id', controller.checkUser_id, controller.feedCreature);
router.put('/:user_id/water/:creatureBought_id', controller.checkUser_id, controller.waterCreature);

module.exports = router;