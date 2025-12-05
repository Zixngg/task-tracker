const model = require("../models/rewardGottenModel.js");

// to select all records from the RewardGotten table
module.exports.readAllRewardGotten = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllReward:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

// to select a record by rewardGotten_id from the RewardGotten table
module.exports.readRewardGottenById = (req, res, next) =>
{
    const data = {
        rewardGotten_id: req.params.rewardGotten_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readRewardGottenById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0)  // when the given rewardGotten_id does not exist
            {
                res.status(404).json({
                    message: "rewardGotten_id not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}

// to select records by user_id from the RewardGotten table
module.exports.rewardGottenByUserId = (req, res, next) =>
{
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error rewardGottenByUserId:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0)  // when the user does not have any rewards
            {
                res.status(404).json({
                    message: "User does not have any rewards."
                });
            }
            else res.status(200).json(results);
        }
    }

    model.selectByUserId(data, callback);
}