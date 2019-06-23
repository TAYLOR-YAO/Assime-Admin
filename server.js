
//  Node packages
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

const inventoryRoutes = require("./routes/inventory-routes")
const storeRoutes = require("./routes/stores-routes");
const DeliveredRoutes = require("./routes/Delivered-routes");
const userRoutes = require("./routes/signin-routes");
const sellsRoutes = require("./routes/sells-routes");
const updatesRoutes = require("./routes/updates-routes");
const paymentRoute = require("./routes/payment-routes");
const users = require("./routes/User-routes");
const adminUser = require("./routes/adminUser-routes")




const path = require("path");
//  =================================================

//  Connection with express modules
const app = express();
const PORT = process.env.PORT || 5000;
//  ========================================

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use (express.static("client/build"))

//Connection to mongoDB
const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/auth-assime', ()=>{
    console.log("Succesfuly Connected to MongoDB")
});


// ---------------------------------CosmossDB Connector --------------------------------
// mongoose.connect(process.env.CONNECTING_STRING || 'mongodb://localhost/assime228', ()=>{
//         console.log("Succesfuly Connected to CosmosDB")
    // });
// --------------------------------------------------------------------------------------

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);


app.use("/api",inventoryRoutes);
app.use("/api/store", storeRoutes);
app.use("/api", DeliveredRoutes);
app.use("/api", userRoutes);
app.use("/api", sellsRoutes);
app.use("/api", updatesRoutes);
app.use("/api", paymentRoute);
// app.use("/api/users", userRoutes);
app.use("/api/users", users);
app.use("/api/admin", adminUser);



app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});




// PORT Listener
app.listen(PORT,()=>{
    console.log(`Listening on port: ${PORT}`);
});