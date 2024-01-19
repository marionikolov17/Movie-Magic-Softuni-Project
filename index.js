const express = require("express");

const handlebarsConfig = require("./config/handlebarsConfig");
const expressConfig = require("./config/expressConfig");

const app = express();

// Setting view engine handlebars
handlebarsConfig(app);

// Express config
expressConfig(app);

app.get("/", (req, res) => {
    res.render("home");
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port} - http://localhost:${port}`);
});