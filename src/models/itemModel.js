const pool = require('../services/db');

// to select all records from the Item table
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Item;
    `;

    pool.query(SQLSTATMENT, callback);
}

// to select a record by item_id from the Item table
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Item
    WHERE item_id = ?;
    `;
    const VALUES = [data.item_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// to check the points of a user is enough for them to buy the item
module.exports.checkPoints = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT total_points FROM User
    WHERE user_id = ?;
    SELECT item_points FROM Item
    WHERE item_id = ?;
    `;
    const VALUES = [data.user_id, data.item_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// to check if an item with the given item_id exists in the Item table
module.exports.checkItemId = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Item
    WHERE item_id = ?;
    `;
    const VALUES = [data.item_id];

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

// to check the points of a user is enough to buy the item
module.exports.checkPoints = (data, callback) => {
    const SQL_STATEMENT = `
      SELECT total_points FROM User
      WHERE user_id = ?;
      SELECT item_points FROM Item
      WHERE item_id = ?;
    `;
    const VALUES = [data.user_id, data.item_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

// to deduct the points from the user after buying the item
module.exports.updateUserPoints = (data, callback) => {
    const SQL_STATEMENT = `
      UPDATE User
      SET total_points = ?
      WHERE user_id = ?;
    `;
    const VALUES = [data.points, data.user_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

// to record the purchase of an item in the itemBought table after successfully buying the item
module.exports.recordBuyItem = (data, callback) => {
    const SQL_STATEMENT = `
      INSERT INTO itemBought (user_id, item_id, item_name, item_description)
      VALUES (?, ?, ?, ?);
    `;
    const VALUES = [data.user_id, data.item_id, data.name, data.item_description];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

// to get the name of the item and description
module.exports.retrieveItemNameDesc = (data, callback) => {
    const SQL_STATEMENT = `
      
      SELECT name, description
      FROM Item
      WHERE item_id = ?;
    `;
    const VALUES = [data.item_id];
    pool.query(SQL_STATEMENT, VALUES, callback);
};