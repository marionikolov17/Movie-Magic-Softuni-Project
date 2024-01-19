const express = require("express");

// Config imports
const handlebarsConfig = require("./config/handlebarsConfig");
const expressConfig = require("./config/expressConfig");

// Router imports
const router = require("./routes/routes");

const app = express();

// Setting view engine handlebars
handlebarsConfig(app);

// Express config
expressConfig(app);

app.use(router);

const port = 5000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port} - http://localhost:${port}`);
});