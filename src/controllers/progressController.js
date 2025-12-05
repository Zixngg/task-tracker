const model = require("../models/progressModel.js");

// to select all records from the TaskProgress table
module.exports.readAllProgress = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllProgress:", error);
            res.status(500).json(error);
        } 
        else {

            // Splits Date and Time, and prints out Date only for each completion_date
            results.forEach(result => {
                result["completion_date"] = result["completion_date"].split(' ')[0];
            });                  

            res.status(200).json(results);
        }
    }

    model.selectAll(callback);
}

// to select a record by progress_id from the TaskProgress table
module.exports.readProgressById = (req, res, next) =>
{
    const data = {
        progress_id: req.params.progress_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readProgressById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) // when the given progress_id does not exist
            {
                res.status(404).json({
                    message: "Progress not found"
                });
            }
            else {

                // Splits Date and Time, and prints out Date only
                results[0]["completion_date"] = results[0]["completion_date"].split(' ')[0];

                res.status(200).json(results[0]);
            }
        }
    }

    model.selectById(data, callback);
}

// a middleware: to check if a user with the given user_id exists in the User table
module.exports.checkUser_id = (req, res, next) =>
{
    const data = {
        user_id: req.body.user_id
    }

    const callback = (error, results, fields) => {
        if (error){
            res.status(500).json(error);
        }else if (results.length == 0){  // when the given user_id does not exist
            res.status(404).json({
                message: "user_id not found."
            })
        }else{
            next();
        }
    }

    model.checkUser_id(data,callback);
}

// a middleware: to check if a task with the given task_id exists in the Task table
module.exports.checkTask_id = (req, res, next) =>
{
    const data = {
        task_id: req.body.task_id
    }

    const callback = (error, results, fields) => {
        if (error){
            res.status(500).json(error);
        }else if (results.length == 0){  // when the given task_id does not exist
            res.status(404).json({
                message: "task_id not found."
            })
        }else{
            next();
        }
    }

    model.checkTask_id(data,callback);
}

// to insert a record into the TaskProgress table and update user points
module.exports.createNewProgress = (req, res, next) =>
{

    const data = {
        user_id: req.body.user_id,
        task_id: req.body.task_id,
        notes: req.body.notes
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewProgress:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json({
                "progress_id": results[0].insertId,
                "user_id": data.user_id,
                "task_id": data.task_id,
                "completion_date": results[1].completion_date,
                "notes": data.notes
            });
        }
    }

    model.insertSingle(data, callback);
}

// a middleware: to update notes by progress_id in the TaskProgress table
module.exports.updateProgressById = (req, res, next) =>
{
    if(req.body.notes == undefined)  // when notes is not given
    {
        res.status(400).send(
            "Error: notes is undefined"
        );
        return;
    }

    const data = {
        notes: req.body.notes,
        progress_id: req.params.progress_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateProgressById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0)  // when the given progress_id does not exist
            {
                res.status(404).json({
                    message: "Progress not found"
                });
            }
            else{
                next();
            } 
        }
    }

    model.updateById(data, callback);
}

// to read the updated progress by progress_id from the TaskProgress table
module.exports.readUpdatedProgressById = (req, res, next) =>
{
    const data = {
        progress_id: req.params.progress_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readProgressById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({  // when the given progress_id does not exist
                    message: "Progress not found"
                });
            }
            else {

                // Splits Date and Time, and prints out Date only
                results[0]["completion_date"] = results[0]["completion_date"].split(' ')[0];

                res.status(200).json(results[0]);
            }
        }
    }

    model.readUpdatedProgressById(data, callback);
}

// to delete a record by progress_id from the TaskProgress table 
module.exports.deleteProgressById = (req, res, next) =>
{
    const data = {
        progress_id: req.params.progress_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteProgressById:", error);
            res.status(500).json(error);
        } else {
            if(results[0].affectedRows == 0) 
            {
                res.status(404).json({  // when the given progress_id does not exist
                    message: "Progress not found"
                });
            }
            else res.status(204).send(results);        
        }
    }

    model.deleteById(data, callback);
}