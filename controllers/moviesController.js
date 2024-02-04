const router = require('express').Router();
const auth = require("./../middlewares/authMiddleware");

const { createMovie, getMovie, attachCast, getMovieCasts, editMovie, deleteMovie } = require('../services/movieService');

const { getCasts } = require("../services/castService");


const isOwner = async (req, res, next) => {
    const movie = await getMovie(req.params.id);
    const isOwner = req.userId == movie.owner;

    if (!isOwner) {
        return res.redirect(`/movies/${req.params.id}`);
    }

    req.movie = movie;
    req.isOwner = isOwner;
    next();
}

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

router.get("/:id/edit", auth.isAuth, isOwner, (req, res) => {
    res.render("movies/edit", { movie: req.movie });
});

router.get("/:id/delete", auth.isAuth, isOwner, async (req, res) => {
    await deleteMovie(req.params.id);
    res.redirect("/");
});

router.post("/:id/attach", auth.isAuth, async (req, res) => {
    await attachCast(req.params.id, req.body.cast);

    res.redirect("/");
});

router.post("/create", auth.isAuth, async (req, res) => {
    await createMovie({...req.body, owner: req.userId});
    res.redirect("/");
});

router.post("/:id/edit", auth.isAuth, isOwner, async (req, res) => {
    await editMovie(req.params.id, req.body);
    res.redirect(`/movies/${req.params.id}`);
});

module.exports = router;