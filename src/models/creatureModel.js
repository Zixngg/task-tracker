const pool = require('../services/db');

// to select all records from the Creature table
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Creature;
    `;

    pool.query(SQLSTATMENT, callback);
}

// to select a record by creature_id from the Creature table
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Creature
    WHERE creature_id = ?;
    `;
    const VALUES = [data.creature_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// to check if a creature with the given creature_id exists in the Creature table
module.exports.checkCreatureId = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Creature
    WHERE creature_id = ?;
    `;
    const VALUES = [data.creature_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// to check if a user with the given user_id exists in the User table
module.exports.checkUserId = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// to check the points of a user is enough to buy the creature 
module.exports.checkPoints = (data, callback) => {
    const SQL_STATEMENT = `
      SELECT total_points FROM User
      WHERE user_id = ?;
      SELECT creature_points FROM Creature
      WHERE creature_id = ?;
    `;
    const VALUES = [data.user_id, data.creature_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

// to update the points of a user in the User table after buying the creature
module.exports.updateUserPoints = (data, callback) => {
    const SQL_STATEMENT = `
      UPDATE User
      SET total_points = ?
      WHERE user_id = ?;
    `;
    const VALUES = [data.points, data.user_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

// to record the purchase of a creature in the CreatureBought table after successfully buying the creature
module.exports.recordBuyCreature = (data, callback) => {
    const SQL_STATEMENT = `
      INSERT INTO CreatureBought (user_id, creature_id, creature_name, creature_description)
      VALUES (?, ?, ?, ?);
    `;
    const VALUES = [data.user_id, data.creature_id, data.name, data.creature_description];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

// to get name of the creature
module.exports.retrieveCreatureNameDesc = (data, callback) => {
    const SQL_STATEMENT = `
      
      SELECT name, description
      FROM Creature
      WHERE creature_id = ?;
    `;
    const VALUES = [data.creature_id];
    pool.query(SQL_STATEMENT, VALUES, callback);
};