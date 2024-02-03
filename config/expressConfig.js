const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

function expressConfig(app) {
    app.use(express.static(path.resolve("public")));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    return app;
}

module.exports = expressConfig;