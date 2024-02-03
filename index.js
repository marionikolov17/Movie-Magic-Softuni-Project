const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

// Config imports
const handlebarsConfig = require("./config/handlebarsConfig");
const expressConfig = require("./config/expressConfig");

// Auth middleware

const auth = require("./middlewares/authMiddleware");

// Router imports
const router = require("./routes/routes");

const app = express();

// Setting view engine handlebars
handlebarsConfig(app);

// Express config
expressConfig(app);

app.use(auth.authMiddleware);
app.use(router);

const port = 5000;

mongoose.connect("mongodb://localhost:27017/", {
    dbName: "movie-magic",
})
    .then(() => {
        console.log("Successfully connected to the database!");

        app.listen(port, () => {
            console.log(`Server is listening on port ${port} - http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.log(`Could not connect to the database!`);
    })

