const { getMovies, getMovie, searchMovies } = require("../services/movieService");

const router = require("express").Router();

router.get("/", async (req, res) => {
    const movies = await getMovies();
    res.render("home", { movies });
});

router.get("/about", (req, res) => {
    res.render("about");
});

router.get("/search", async (req, res) => {
    const movies = await searchMovies(req.query);
    res.render("search", { movies });
});

router.get("/create", (req, res) => {
    res.render("create");
});

router.get("/details/:id", async (req, res) => {
    const movie = await getMovie(Number(req.params.id));
    movie.ratingStars = "&#x2605; ".repeat(movie.rating).trimEnd();
    res.render("details", { movie });
});

router.get("*", (req, res) => {
    res.render("404");
});

module.exports = router;