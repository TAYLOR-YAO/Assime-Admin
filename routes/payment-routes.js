const express = require("express");
const mongoose = require("mongoose");
const db = require("../models");
const router = express.Router();
const stripe = require("stripe")("sk_test_UMzsrxnqnlBdIYXqfyuKIbQa");

router.post("/stripe", (req, res) => { 
    const stripeToken = req.body.stripeToken;
    const cart = req.body.cart

    stripe.charges.create({
        amount: 2000,
        currency: "usd",
        description: JSON.stringify(cart),
        source: stripeToken,
    },function(err, charge) {
        if (err) {
            console.log(err)
            res.send({
                    success: false,
                    message: "Error: "
            }) 
        } else {
            // let address = localStorage.getItem("shipmentAddress")
            // console.log("Storage address", address)

            const sells = JSON.parse(charge.description);
            console.log("Sells: ",sells)
            sells.map(item => {
                item.customerEmail = req.body.email;
                item.customerAddress = `${charge.source.address_line1} ${charge.source.address_city}, ${charge.source.address_state} ${charge.source.address_zip} ${charge.source.address_state}`,
                item.customerName = charge.source.name
                item.inventoryID = item._id
                delete item._id;
            });
       
            db.Sells.insertMany(sells).then(sells=>{
                res.send({
                    success: true,
                    message: "Success",
                    cart: sells
                });
            });
        }
    });
});


module.exports = router;