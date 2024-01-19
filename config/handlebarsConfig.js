const handlebars = require("express-handlebars");
const path = require("path");

function handlebarsConfig(app) {
    app.engine("handlebars", handlebars.engine({
        extname: "hbs"
    }));
    app.set("view engine", "handlebars");
    app.set("views", path.resolve("views"));

    return app;
}

module.exports = handlebarsConfig;