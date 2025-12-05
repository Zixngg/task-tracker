const model = require("../models/creatureModel.js");

// to select all records from the Creature table
module.exports.readAllCreature = (req, res, next) =>
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

// to select a record by creature_id from the Creature table
module.exports.readCreatureById = (req, res, next) =>
{
    const data = {
        creature_id: req.params.creature_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readCreatureById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0)   // when the given creature_id does not exist
            {
                res.status(404).json({
                    message: "Creature not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}

// a middleware: to check if a creature with the given creature_id exists in the Creature table
module.exports.checkCreatureId = (req, res, next) =>
{
    const data = {
        creature_id: req.params.creature_id
    }

    const callback = (error, results, fields) => {
        if (error){
            res.status(500).json(error);
        }else if (results.length == 0){  // when the given creature_id does not exist
            res.status(404).json({
                message: "Creature not found"
            });
        }else{
            next();
        }
    }

    model.checkCreatureId(data,callback);
}

// a middleware: to check if a user with the given user_id exists in the User table
module.exports.checkUserId = (req, res, next) =>
{
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error){
            res.status(500).json(error);
        }else if (results.length == 0){  // when the given user_id does not exist
            res.status(404).json({
                message: "User not found"
            });
        }else{
            next();
        }
    }

    model.checkUserId(data,callback);
}

// get name of creature and description
module.exports.retrieveCreatureNameDesc = (req, res, next) => {
    const data = {
      creature_id: req.params.creature_id
    };
  
    const callback = (error, results, fields) => {
      if (error) {
        res.status(500).json(error);
      } else {
        
        req.creatureName = results[0].name; // Store the name in req object
        req.description = results[0].description; // Store the description in req object

        next();
      }
    };
  
    model.retrieveCreatureNameDesc(data, callback);
};

// to check if the user has enough points to buy the creature and record down the creature the user has bought
module.exports.checkPointsAndBuyCreature = (req, res, next) => {
    const data = {
      user_id: req.params.user_id,
      creature_id: req.params.creature_id
    };
  
    const callback = (error, results, fields) => {
      if (error) {
        res.status(500).json(error);
      } else {
        const user_points = results[0][0].total_points;  // to get the amount of points the user has
        const creature_points =  results[1][0].creature_points;  // to get the points needed to buy the creature
  
        // Check if the user has enough points to buy the creature
        if (user_points >= creature_points) {
            const remainingPoints = user_points - creature_points; // the number of points left for the user after buying the creature
  
            const data = {
                user_id: req.params.user_id,
                creature_id: req.params.creature_id,
                points: remainingPoints,
                name: req.creatureName,
                creature_description: req.description 
            }
  
          const callback = (error, results, fields) => {
            if (error) {
              res.status(500).json(error);
            } else {
              const callback = (error) => {
                if (error) {
                  res.status(500).json(error);
                } else {
                    res.status(200).json({ 
                        success: true, 
                        remainingPoints 
                    });
                }
              };

              // record the purchase of a creature in the CreatureBought table after successfully buying the creature
              model.recordBuyCreature(data, callback);
            }
          };
  
          // update the points of a user in the User table after buying the creature
          model.updateUserPoints(data ,callback);
        } else {
          res.status(400).json({
            message: "Insufficient Points!"
          });  // when the user does not have enough points to buy the creature
        }
      }
    };
  
    // to check the points of a user is enough to buy the creature 
    model.checkPoints(data, callback);
};