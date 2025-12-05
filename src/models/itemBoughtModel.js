const pool = require('../services/db');

// to select all records from the ItemBought table
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM ItemBought;
    `;

    pool.query(SQLSTATMENT, callback);
}

// to select records by user_id from the ItemBought table
module.exports.selectByUserId = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM ItemBought
    WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}