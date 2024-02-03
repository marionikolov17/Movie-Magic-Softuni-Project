const router = require("express").Router();
const auth = require("./../middlewares/authMiddleware");

const castService = require("../services/castService");

router.get("/create", auth.isAuth, (req, res) => {
    res.render("castCreate");
});

router.post("/create", auth.isAuth, async (req, res) => {
    await castService.createCast(req.body);

    res.redirect("/");
});

module.exports = router;