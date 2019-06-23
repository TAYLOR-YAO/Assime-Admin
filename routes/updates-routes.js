const express = require("express");
const mongoose = require("mongoose");
const db = require("../models");
const router = express.Router();


router.delete("/clearallproducts", (req, res) => {  
    db.Inventory.remove({}).then(result =>{
        res.send({
            success: "Success!",
            message: " All products have been successfuly deleted!" 
        });
    }).catch(err => {
        return (err.message);
    });
});

router.post("/clearstoreproducts", (req, res) => {  

    db.Inventory.remove({"storeId": req.body.id}).then(result =>{
        res.send({
            success: "Success!",
            message: " Store products have been successfuly deleted!" 
        });
    }).catch(err => {
        return (err.message);
    });
});

router.post("/clearstore", (req, res) => {  
 
    db.Stores.findOneAndRemove({"_id": req.body.id}).then(result =>{
        res.send({
            success: "Success!",
            message: " Store have been successfuly deleted!" 
        });
    }).catch(err => {
        return (err.message);
    });
});

module.exports = router;
