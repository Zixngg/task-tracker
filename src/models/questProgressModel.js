const pool = require('../services/db');

// to select all records from the QuestProgress table
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM QuestProgress;
    `;

    pool.query(SQLSTATMENT, callback);
}

// to select a record by questProgress_id from the QuestProgress table
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM QuestProgress
    WHERE questProgress_id = ?;
    `;
    const VALUES = [data.questProgress_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// to check if a user with the given user_id exists in the User table
module.exports.checkUser_id = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// to check if a quest with the given quest_id exists in the Quest table
module.exports.checkQuest_id = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Quest
    WHERE quest_id = ?;
    `;
    const VALUES = [data.quest_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// to select all records from the Rewards table for a random reward
module.exports.randomReward = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Rewards;
    `;

    pool.query(SQLSTATMENT, callback);
}

// to insert a record into the QuestProgress and RewardGotten tables and record down the random reward gotten in the RewardGotten table
module.exports.insertSingle = (data, callback) => {
    const SQL_STATEMENT = `
    INSERT INTO QuestProgress (user_id, quest_id, completion_date)
    VALUES (?, ?, ?);
    INSERT INTO RewardGotten (user_id, reward_id, reward_name, reward_description)
    VALUES (?, ?, ?, ?);
    `;
  
    const VALUES = [data.user_id, data.quest_id, data.completion_date, data.user_id, data.reward_id, data.reward_name, data.description];
  
    pool.query(SQL_STATEMENT, VALUES, callback);
};

// to get the name of the reward and the description
module.exports.retrieveRewardNameDesc = (data, callback) => {
    const SQL_STATEMENT = `
      
      SELECT name, description 
      FROM Rewards
      WHERE reward_id = ?;
    `;
    const VALUES = [data.reward_id];
    pool.query(SQL_STATEMENT, VALUES, callback);
};