const router = require("express").Router();

const { getMovies } = require("../services/movieService");

router.get("/", async (req, res) => {
    const movies = await getMovies();
    res.render("home", { movies });
});

router.get("/about", (req, res) => {
    res.render("about");
});

module.exports = router;