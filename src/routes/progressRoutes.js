const express = require('express');
const router = express.Router();
const controller = require('../controllers/progressController');

router.get('/', controller.readAllProgress);
router.post('/', controller.checkUser_id, controller.checkTask_id, controller.createNewProgress);

router.get('/:progress_id', controller.readProgressById);
router.put('/:progress_id', controller.updateProgressById, controller.readUpdatedProgressById);
router.delete('/:progress_id', controller.deleteProgressById);

module.exports = router;