const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoutes');
const progressRoutes = require('./progressRoutes');
const itemRoutes = require('./itemRoutes');
const itemBoughtRoutes = require('./itemBoughtRoutes');
const creatureRoutes = require('./creatureRoutes');
const creatureBoughtRoutes = require('./creatureBoughtRoutes');
const questRoutes = require('./questRoutes');
const questProgressRoutes = require('./questProgressRoutes');
const rewardRoutes = require('./rewardRoutes');
const rewardGottenRoutes = require('./rewardGottenRoutes');
const messageRoutes = require('./messageRoutes');

router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);
router.use("/task_progress", progressRoutes);
router.use("/buy_items", itemRoutes);
router.use("/items", itemBoughtRoutes);
router.use("/buy_creatures", creatureRoutes);
router.use("/creatures", creatureBoughtRoutes);
router.use("/quests", questRoutes);
router.use("/quest_progress", questProgressRoutes);
router.use("/rewards", rewardRoutes);
router.use("/reward_gotten", rewardGottenRoutes);
router.use("/message", messageRoutes);

module.exports = router;