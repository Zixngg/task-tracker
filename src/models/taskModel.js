const pool = require('../services/db');

// to select all tasks from the Task table
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Task;
    `;

    pool.query(SQLSTATMENT, callback);
}

// to select a task by task_id from the Task table
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Task
    WHERE task_id = ?;
    `;
    const VALUES = [data.task_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// to insert a task into the Task table
module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Task (title, description, points)
    VALUES (?, ?, ?);
    SELECT * FROM Task
    WHERE task_id = ?;
    `;
    const VALUES = [data.title, data.description, data.points, data.task_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// to update a task by task_id in the Task table
module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Task 
    SET title = ?, description = ?, points = ?
    WHERE task_id = ?;
    `;
    const VALUES = [data.title, data.description, data.points, data.task_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// to delete a task by task_id from the Task table
module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Task 
    WHERE task_id = ?;
    `;
    const VALUES = [data.task_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}