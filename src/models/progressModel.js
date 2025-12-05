const pool = require('../services/db');

// to select all records from the TaskProgress table
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM TaskProgress;
    `;

    pool.query(SQLSTATMENT, callback);
}

// to select a record by progress_id from the TaskProgress table
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM TaskProgress
    WHERE progress_id = ?;
    `;
    const VALUES = [data.progress_id];

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

// to check if a task with the given task_id exists in the Task table
module.exports.checkTask_id = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Task
    WHERE task_id = ?;
    `;
    const VALUES = [data.task_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// to insert a record into the TaskProgress table and update user points
module.exports.insertSingle = (data, callback) => {
    const SQL_STATEMENT = `
      INSERT INTO TaskProgress (user_id, task_id, completion_date, notes)
      VALUES (?, ?, ?, ?);
      UPDATE User
      SET total_points = total_points + (
        SELECT points
        FROM Task
        WHERE task_id = ?
      )
      WHERE user_id = ?;
    `;
  
    const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes, data.task_id, data.user_id,];
  
    pool.query(SQL_STATEMENT, VALUES, callback);
};

// to update notes by progress_id in the TaskProgress table
module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE TaskProgress 
    SET notes = ?
    WHERE progress_id = ?;
    SELECT * FROM TaskProgress
    WHERE progress_id = ?;
    `;
    const VALUES = [data.notes, data.progress_id, data.progress_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// to read the updated progress by progress_id from the TaskProgress table
module.exports.readUpdatedProgressById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM TaskProgress
    WHERE progress_id = ?;
    `;
    const VALUES = [data.progress_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// to delete a record by progress_id from the TaskProgress table 
module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM TaskProgress 
    WHERE progress_id = ?;

    ALTER TABLE Task AUTO_INCREMENT = 1;
    `;
    const VALUES = [data.progress_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}