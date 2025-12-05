const model = require("../models/questProgressModel.js");

// to select all records from the QuestProgress table
module.exports.readAllQuestProgress = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllQuestProgress:", error);
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

// to select a record by questProgress_id from the QuestProgress table
module.exports.readQuestProgressById = (req, res, next) =>
{
    const data = {
        questProgress_id: req.params.questProgress_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readQuestProgressById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0)  // when the given questProgress_id does not exist
            {
                res.status(404).json({
                    message: "Quest Progress not found"
                });
            }
            else {

                // Splits Date and Time, and prints out Date only for each completion_date
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

// a middleware: to check if a quest with the given quest_id exists in the Quest table
module.exports.checkQuest_id = (req, res, next) =>
{
    const data = {
        quest_id: req.body.quest_id
    }

    const callback = (error, results, fields) => {
        if (error){
            res.status(500).json(error);
        }else if (results.length == 0){  // when the given quest_id does not exist
            res.status(404).json({
                message: "quest_id not found."
            })
        }else{
            next();
        }
    }

    model.checkQuest_id(data,callback);
}

// a middleware: to select all records from the Rewards table for a random reward
module.exports.randomReward = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllRewards:", error);
            res.status(500).json(error);
        } 
        else {
            const randomReward = Math.floor(Math.random() * 10);  // to randomly give the user a reward after they have completed their quest
            reward = results[randomReward].reward_id;

            next();
        }
    }

    model.randomReward(callback);
}

// get name of reward
module.exports.retrieveRewardNameDesc = (req, res, next) => {
    const data = {
        reward_id: reward
    };
  
    const callback = (error, results, fields) => {
      if (error) {
        res.status(500).json(error);
      } else {
        req.rewardName = results[0].name; // Store the name in req object
        req.rewardDesc = results[0].description; // Store the description in req object
    
        next();
      }
    };
  
    model.retrieveRewardNameDesc(data, callback);
};

// to insert a record into the QuestProgress and RewardGotten tables and record down the random reward gotten in the RewardGotten table
module.exports.createNewQuestProgress = (req, res, next) =>
{
    if(req.body.completion_date == undefined)  // when completion_date is not given
    {
        res.status(400).send("Error: completion_date is undefined");
        return;
    }

    const data = {
        user_id: req.body.user_id,
        quest_id: req.body.quest_id,
        completion_date: req.body.completion_date,
        reward_name: req.rewardName,
        reward_id: reward,
        description: req.rewardDesc
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewQuestProgress:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json({
                "questProgress_id": results[0].insertId,
                "user_id": data.user_id,
                "quest_id": data.quest_id,
                "completion_date": data.completion_date,
                "reward_name": data.reward_name,
                "reward_id": data.reward_id,
                "reward_description": data.description
            });
        }
    }

    model.insertSingle(data, callback);
}
