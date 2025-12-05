const pool = require('../services/db');

// to select all rewards from the Rewards table
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Rewards;
    `;

    pool.query(SQLSTATMENT, callback);
}

// to select a reward by reward_id from the Rewards table
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Rewards
    WHERE reward_id = ?;
    `;
    const VALUES = [data.reward_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}