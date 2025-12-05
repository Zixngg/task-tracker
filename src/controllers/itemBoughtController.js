const model = require("../models/itemBoughtModel.js");

// to select all records from the ItemBought table
module.exports.readAllItemBought = (req, res, next) =>
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

// to select records by user_id from the ItemBought table
module.exports.readItemBougthByUserId = (req, res, next) =>
{
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readItemBougthByUserId:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0)  // when the user has not bought any items
            {
                res.status(404).json({
                    message: "User does not have any items."
                });
            }
            else res.status(200).json(results);
        }
    }

    model.selectByUserId(data, callback);
}
