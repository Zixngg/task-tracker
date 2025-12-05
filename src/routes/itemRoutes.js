const express = require('express');
const router = express.Router();
const controller = require('../controllers/itemController');

router.get('/', controller.readAllItem);

router.get('/:item_id', controller.readItemById);
router.post('/:item_id/users/:user_id', controller.checkItemId, controller.checkUserId, controller.retrieveItemNameDesc, controller.checkPointsAndBuyItems);

module.exports = router;