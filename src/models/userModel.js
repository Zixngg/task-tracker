const pool = require('../services/db');

// to select all users from the User table
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT user_id, username, email, created_on, updated_on, last_login_on, total_points
    FROM User;
    `;

    pool.query(SQLSTATMENT, callback);
}

// to select a user by user_id from the User table
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// to check if an email is unique in the User table
module.exports.uniqueEmail = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE email = ?;
    `;
    const VALUES = [data.email];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// to check if a username is unique in the User table
module.exports.uniqueUsername = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE username = ?;
    `;
    const VALUES = [data.username];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// to insert a user into the User table
module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO User (username, email)
    VALUES (?, ?);
    `;
    const VALUES = [data.username, data.email, data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// to update a user by user_id in the User table
module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE User 
    SET username = ?, email = ?
    WHERE user_id = ?;
   
    `;
    const VALUES = [data.username, data.email, data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// to delete a user by user_id from the User table
module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM User 
    WHERE user_id = ?;

    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// Check username or email exist
module.exports.checkUsernameOrEmailExist = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE email = ?;

    SELECT * FROM User
    WHERE username = ?;
    `;
    const VALUES = [data.email, data.username];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// Register
module.exports.register = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO User (username, email, password)
    VALUES (?, ?, ?);

    SELECT * FROM User
    WHERE username = ?
    `;
    const VALUES = [data.username, data.email, data.hashPassword, data.username];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// Login
module.exports.login = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE username = ?;
    `;
    const VALUES = [data.username];

    pool.query(SQLSTATMENT, VALUES, callback);
}