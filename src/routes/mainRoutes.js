const express = require('express');
const router = express.Router();
const pool = require('../services/db');
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

// Health check endpoint to test database connection
router.get("/health", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Health check - Database connection error:', err);
            res.status(500).json({
                status: 'error',
                message: 'Database connection failed',
                error: err.message,
                env: {
                    DB_HOST: process.env.DB_HOST ? 'SET' : 'MISSING',
                    DB_USER: process.env.DB_USER ? 'SET' : 'MISSING',
                    DB_PASSWORD: process.env.DB_PASSWORD ? 'SET' : 'MISSING',
                    DB_DATABASE: process.env.DB_DATABASE ? 'SET' : 'MISSING'
                }
            });
        } else {
            connection.query('SELECT 1 as test', (queryErr, results) => {
                connection.release();
                if (queryErr) {
                    res.status(500).json({
                        status: 'error',
                        message: 'Database query failed',
                        error: queryErr.message
                    });
                } else {
                    res.status(200).json({
                        status: 'ok',
                        message: 'Database connection successful',
                        database: process.env.DB_DATABASE
                    });
                }
            });
        }
    });
});

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