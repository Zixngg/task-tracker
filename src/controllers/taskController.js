const model = require("../models/taskModel.js");

// to select all tasks from the Task table
module.exports.readAllTask = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllTask:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

// to select a task by task_id from the Task table
module.exports.readTaskById = (req, res, next) =>
{
    const data = {
        task_id: req.params.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTaskById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0)  // when the given task_id does not exist
            {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}

// to insert a task into the Task table
module.exports.createNewTask = (req, res, next) =>
{
    // when title, description and points is not given
    if(req.body.title == undefined || req.body.description == undefined || req.body.points == undefined)
    {
        res.status(400).send("Error: title, description or points is undefined");
        return;
    }

    const data = {
        task_id: req.params.task_id,
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewTask:", error);
            res.status(500).json(error);
        } else {
            // res.status(201).json({results});
            res.status(201).json({
                "task_id": results[0].insertId,
                "title": data.title,
                "description": data.description,
                "points": data.points
            });
        }
    }

    model.insertSingle(data, callback);
}

// to update a task by task_id in the Task table
module.exports.updateTaskById = (req, res, next) =>
{
    // when title, description and points is not given
    if(req.body.title == undefined || req.body.description == undefined || req.body.points == undefined)
    {
        res.status(400).send(
            "Error: title, description or points is undefined"
        );
        return;
    }

    const data = {
        task_id: req.params.task_id,
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateTaskById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0)  // when the given task_id does not exist
            {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else {
                res.status(200).json({
                "task_id": data.task_id,
                "title": data.title,
                "description": data.description,
                "points": data.points
            }); 
            }
        }
    }
    model.updateById(data, callback);
}

// to delete a task by task_id from the Task table
module.exports.deleteTaskById = (req, res, next) =>
{
    const data = {
        task_id: req.params.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteTaskById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0)  // when the given task_id does not exist
            {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else {
                res.status(204).send(); // 204 No Content    
            }        
        }
    }

    model.deleteById(data, callback);
}