const model = require("../models/questModel.js");

// to select all quests from the Quest table
module.exports.readAllQuest = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllQuest:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

// to select a quest by quest_id from the Quest table
module.exports.readQuestById = (req, res, next) =>
{
    const data = {
        quest_id: req.params.quest_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readQuestById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0)  // when the given quest_id does not exist
            {
                res.status(404).json({
                    message: "Quest not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}
