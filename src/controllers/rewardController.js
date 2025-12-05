const model = require("../models/rewardModel.js");

// to select all rewards from the Rewards table
module.exports.readAllReward = (req, res, next) =>
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

// to select a reward by reward_id from the Rewards table
module.exports.readRewardById = (req, res, next) =>
{
    const data = {
        reward_id: req.params.reward_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readRewardById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0)   // when the given reward_id does not exist
            {
                res.status(404).json({
                    message: "Reward not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}