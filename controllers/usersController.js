const router = require("express").Router();

const userService = require("./../services/userService");

router.get("/login", (req, res) => {
    res.render("users/login");
});

router.get("/register", (req, res) => {
    res.render("users/register");
});

router.post("/register", async (req, res) => {
    await userService.registerUser(req.body);

    res.redirect("/login");
});

router.post("/login", async (req, res) => {
    const token = await userService.loginUser(req.body);

    res.cookie("auth", token);

    res.redirect("/");
});

module.exports = router;