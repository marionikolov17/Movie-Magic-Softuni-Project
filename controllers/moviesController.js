const router = require('express').Router();

const { createMovie, getMovie, attachCast, getMovieCasts } = require('../services/movieService');

const { getCasts } = require("../services/castService");

router.get("/create", (req, res) => {
    res.render("create");
});

router.get("/search", async (req, res) => {
    res.render("search");
});

router.get("/:id", async (req, res) => {
    const movie = await getMovie(req.params.id);
    movie.ratingStars = "&#x2605; ".repeat(movie.rating).trimEnd();

    const casts = await getMovieCasts(req.params.id);
    console.log(casts)

    res.render("details", { movie, casts: casts.cast });
});

router.get("/:id/attach", async (req, res) => {
    const movie = await getMovie(req.params.id);
    const casts = await getCasts();
    res.render("castAttach", { movie, casts });
});

router.post("/:id/attach", async (req, res) => {
    await attachCast(req.params.id, req.body.cast);

    res.redirect("/");
});

router.post("/create", async (req, res) => {
    await createMovie(req.body);
    res.redirect("/");
});

module.exports = router;