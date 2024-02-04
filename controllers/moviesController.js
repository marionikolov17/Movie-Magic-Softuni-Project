const router = require('express').Router();
const auth = require("./../middlewares/authMiddleware");

const { createMovie, getMovie, attachCast, getMovieCasts } = require('../services/movieService');

const { getCasts } = require("../services/castService");

router.get("/create", auth.isAuth, (req, res) => {
    res.render("create");
});

router.get("/search", async (req, res) => {
    res.render("search");
});

router.get("/:id", async (req, res) => {
    const movie = await getMovie(req.params.id);
    movie.ratingStars = "&#x2605; ".repeat(movie.rating).trimEnd();
    const isOwner = req.userId == movie.owner;

    const casts = await getMovieCasts(req.params.id);
    //console.log(casts)

    res.render("details", { movie, casts: casts.cast, isOwner });
});

router.get("/:id/attach", auth.isAuth, async (req, res) => {
    const movie = await getMovie(req.params.id);
    const casts = await getCasts();
    res.render("castAttach", { movie, casts });
});

router.get("/:id/edit", auth.isAuth, async (req, res) => {
    const movie = await getMovie(req.params.id);
    const isOwner = req.userId == movie.owner;

    if (!isOwner) {
        return res.redirect(`/movies/${req.params.id}`);
    }

    res.render("movies/edit", { movie });
});

router.post("/:id/attach", auth.isAuth, async (req, res) => {
    await attachCast(req.params.id, req.body.cast);

    res.redirect("/");
});

router.post("/create", auth.isAuth, async (req, res) => {
    await createMovie({...req.body, owner: req.userId});
    res.redirect("/");
});

module.exports = router;