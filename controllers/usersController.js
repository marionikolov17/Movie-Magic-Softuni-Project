const router = require("express").Router();

const userService = require("./../services/userService");

router.get("/login", (req, res) => {
    if (req.userId) {
        return res.redirect("/");
    }
    res.render("users/login");
});

router.get("/register", (req, res) => {
    if (req.userId) {
        return res.redirect("/");
    }
    res.render("users/register");
});

router.get("/logout", (req, res) => {
    res.clearCookie("auth");

    res.redirect("/login");
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