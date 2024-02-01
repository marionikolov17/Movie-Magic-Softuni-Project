const router = require("express").Router();

const castService = require("../services/castService");

router.get("/create", (req, res) => {
    res.render("castCreate");
});

router.post("/create", async (req, res) => {
    await castService.createCast(req.body);

    res.redirect("/");
});

module.exports = router;