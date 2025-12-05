const express = require('express');
const router = express.Router();
const controller = require('../controllers/itemBoughtController');

router.get('/', controller.readAllItemBought);
router.get('/users/:user_id', controller.readItemBougthByUserId);

module.exports = router;