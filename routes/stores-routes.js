const express = require("express");
const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/Keys");
// Load input validation
const validateRegisterInput = require("../validation/store-register");
// const validateLoginInput = require("../validation/login");
const router = express.Router();

router.post("/enroll", (req, res) => {  
    const { errors, isValid } = validateRegisterInput(req.body);
 // Check validation
   if (!isValid) {
     return res.status(400).json(errors);
   }
 db.Stores.findOne({ email: req.body.email }).then(user => {
     if (user) {
       return res.status(400).json({ email: "Email already exists" });
     } else {
       const newStore = new db.Stores({
        company: req.body.company,
        city: req.body.city,
        countryOrState:req.body.countryOrState,
        email: req.body.email,
        password: req.body.password,
        password2: req.body.password2,
        tel: req.body.tel,
        tel2:req.body.tel2,
        streetAddress: req.body.streetAddress,
        zip: req.body.zip,
        tax:req.body.tax,
        shipping:req.body.shipping,
        expressShipping:req.body.expressShipping,
        storeColor:req.body.storeColor,
        textColor:req.body.textColor
       });
 // Hash password before saving in database
       bcrypt.genSalt(10, (err, salt) => {
         bcrypt.hash(newStore.password, salt, (err, hash) => {
           if (err) throw err;
           newStore.password = hash;
           newStore
             .save()
             .then(store => res.json(store))
             .catch(err => console.log(err));
         });
       });
     }
   });


    // db.Stores.create(req.body).then(store =>{
    //     res.send(store)
    // }).catch(err=>{
    //     console.log(err.message);
    // });
});












router.get("/storeIdentification", (req, res) => {  
    db.Stores.find({}).then(stores =>{
        res.send(stores)
    }).catch(err=>{
        console.log(err.message);
    });
});

router.get("/displaystoreitems", (req, res) => {   
    db.Inventory.find({"company":req.query.company}).then(storeItems =>{
        res.send(storeItems)
    }).catch(err=>{
        console.log(err);
    });
});

router.get("/displaycategoryitems", (req, res) => {
    db.Inventory.find({"category":req.query.category}).then(storeItems =>{
        res.send(storeItems)
    }).catch(err=>{
        console.log(err);
    });
});

router.get("/displaytypeitems", (req, res) => {     
    db.Inventory.find({"type":req.query.type}).then(storeItems =>{
        res.send(storeItems)
    }).catch(err=>{
        console.log(err);
    });
});

module.exports = router;
