const model = require("../models/itemModel.js");

// to select all records from the Item table
module.exports.readAllItem = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllItem:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

// to select a record by item_id from the Item table
module.exports.readItemById = (req, res, next) =>
{
    const data = {
        item_id: req.params.item_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readItemById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({  // when the given item_id does not exist
                    message: "Item not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}

// a middleware: to check if an item with the given item_id exists in the Item table
module.exports.checkItemId = (req, res, next) =>
{
    const data = {
        item_id: req.params.item_id
    }

    const callback = (error, results, fields) => {
        if (error){
            res.status(500).json(error);
        }else if (results.length == 0){
            res.status(404).json({  // when the given item_id does not exist
                message: "Item not found"
            });
        }else{
            next();
        }
    }

    model.checkItemId(data,callback);
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
        }else if (results.length == 0){    // when the given user_id does not exist
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
module.exports.retrieveItemNameDesc = (req, res, next) => {
    const data = {
      item_id: req.params.item_id,
    };
  
    const callback = (error, results, fields) => {
      if (error) {
        res.status(500).json(error);
      } else {
        
        req.itemName = results[0].name; // Store the name in req object
        req.description = results[0].description // Store the description in req object
      
        next();
      }
    };
  
    model.retrieveItemNameDesc(data, callback);
};

// to check if the user has enough points to buy the item and record down the item the user has bought
module.exports.checkPointsAndBuyItems = (req, res, next) => {
    const data = {

      user_id: req.params.user_id,
      item_id: req.params.item_id
  
    };
  
    const callback = (error, results, fields) => {
      if (error) {
        res.status(500).json(error);
      } else {
        const user_points = results[0][0].total_points;  // to get the amount of points the user has
        const item_points =  results[1][0].item_points;  // to get the points needed to buy the item
  
        // Check if the user has enough points to buy the item
        if (user_points >= item_points) {
            const remainingPoints = user_points - item_points;  // the number of points left for the user after buying the item
  
            const data = {
                user_id: req.params.user_id,
                item_id: req.params.item_id,
                points: remainingPoints,
                name: req.itemName,
                item_description: req.description
            }
  
          const callback = (error, results, fields) => {
            if (error) {
              res.status(500).json(error);
            } else {
              const callback = (error) => {
                if (error) {
                  res.status(500).json(error);
                } else {
                  res.status(200).json({ success: true, remainingPoints });
                }
              };
  
              // record the purchase of a item in the CreatureBought table after successfully buying the item
              model.recordBuyItem(data, callback);
            }
          };
  
          // update the points of a user in the User table after buying the item
          model.updateUserPoints(data ,callback);
        } else {
          res.status(400).json({
            message: "Insufficient Points!"
          });  // when the user does not have enough points to buy the item
        }
      }
    };
  
    // to check the points of a user is enough to buy the item
    model.checkPoints(data, callback);
};

