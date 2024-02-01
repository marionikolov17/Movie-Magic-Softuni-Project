const router = require("express").Router();

const viewsController = require("./../controllers/viewsController");
const moviesController = require("./../controllers/moviesController");

router.use(viewsController);
router.use("/movies", moviesController);

router.get("*", (req, res) => {
    res.render("404");
});

module.exports = router;