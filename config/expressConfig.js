const express = require("express");
const path = require("path");

function expressConfig(app) {
    app.use(express.static(path.resolve("public")));

    return app;
}

module.exports = expressConfig;