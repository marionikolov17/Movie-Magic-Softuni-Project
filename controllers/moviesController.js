const { createMovie } = require('../services/movieService');

const router = require('express').Router();

router.post("/create", async (req, res) => {
    await createMovie(req.body);
    res.redirect("/");
});

module.exports = router;