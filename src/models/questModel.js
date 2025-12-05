const pool = require('../services/db');

// to select all quests from the Quest table
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT quest_id, title, description
    FROM Quest;
    `;

    pool.query(SQLSTATMENT, callback);
}

// to select a quest by quest_id from the Quest table
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT quest_id, title, description
    FROM Quest
    WHERE quest_id = ?;
    `;
    const VALUES = [data.quest_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}
