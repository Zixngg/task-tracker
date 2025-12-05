const pool = require('../services/db');

// to select all records from the RewardGotten table
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM RewardGotten;
    `;

    pool.query(SQLSTATMENT, callback);
}

// to select a record by rewardGotten_id from the RewardGotten table
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM RewardGotten
    WHERE rewardGotten_id = ?;
    `;
    const VALUES = [data.rewardGotten_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// to select records by user_id from the RewardGotten table
module.exports.selectByUserId = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM RewardGotten
    WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}