const pool = require('../services/db');

// to select all records from the CreatureBought table
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM CreatureBought;
    `;

    pool.query(SQLSTATMENT, callback);
}

// to select records by user_id from the CreatureBought table
module.exports.selectByUserId = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM CreatureBought
    WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// to check if a user with the given user_id has bought any creatures
module.exports.checkUser_id = (data, callback) => {
    const SQL_STATEMENT = `
      SELECT * FROM CreatureBought
      WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];
    pool.query(SQL_STATEMENT, VALUES, callback);
};

// to update the feedCreature timestamp for a creature owned by a user 
module.exports.feedCreature = (data, callback) => {
    const SQL_STATEMENT = `
      UPDATE CreatureBought
      SET feedCreature = CURRENT_TIMESTAMP
      WHERE user_id = ? AND creatureBought_id = ?;
    `;
    const VALUES = [data.user_id, data.creatureBought_id];
    pool.query(SQL_STATEMENT, VALUES, callback);
};

// to update the waterCreature timestamp for a creature owned by a user
module.exports.waterCreature = (data, callback) => {
    const SQL_STATEMENT = `
      UPDATE CreatureBought
      SET waterCreature = CURRENT_TIMESTAMP
      WHERE user_id = ? AND creatureBought_id = ?;
    `;
    const VALUES = [data.user_id, data.creatureBought_id];
    pool.query(SQL_STATEMENT, VALUES, callback);
};
  

  
