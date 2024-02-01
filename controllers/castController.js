const router = require("express").Router();

router.get("/create", (req, res) => {
    res.render("castCreate");
});

module.exports = router;