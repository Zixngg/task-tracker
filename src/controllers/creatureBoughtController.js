const model = require("../models/creatureBoughtModel.js");

// to select all records from the CreatureBought table
module.exports.readAllCreatureBought = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllCreature:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

// to select records by user_id from the CreatureBought table
module.exports.readCreatureBougthByUserId = (req, res, next) =>
{
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readCreatureBougthByUserId:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0)  // when the user has not bought any creatures
            {
                res.status(404).json({
                    message: "User does not have any creatures."
                });
            }
            else res.status(200).json(results);
        }
    }

    model.selectByUserId(data, callback);
}

// a middleware: to check if a user with the given user_id has bought any creatures
module.exports.checkUser_id = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    };
  
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else if (results.length == 0 ) {  // when the user has not bought any creatures
            res.status(404).json({
                message: "User does not have any creatures."
            });
        } else {
            next();
           
        }
    };
  
    model.checkUser_id(data, callback);
}

// to update the feedCreature timestamp for a creature owned by a user 
module.exports.feedCreature = (req,res,next) => {
    const data = {
      user_id: req.params.user_id,
      creatureBought_id: req.params.creatureBought_id
    }

    
  
    const callback = (error, results, fields) => {
      if (error){
        res.status(500).json(error);
      } else {
        console.log(data.creatureBoughtId)
        res.status(200).json({
          message: "Creature is fed!"
        })
      }
    }
    model.feedCreature(data,callback);
}

// to update the waterCreature timestamp for a creature owned by a user
module.exports.waterCreature = (req,res,next) => {
    const data = {
      user_id: req.params.user_id,
      creatureBought_id: req.params.creatureBought_id
    }
  
    const callback = (error, results, fields) => {
      if (error){
        res.status(500).json(error);
      } else {
        res.status(200).json({
          message: "Creature drank water!"
        })
      }
    }
    model.waterCreature(data,callback);
}
  