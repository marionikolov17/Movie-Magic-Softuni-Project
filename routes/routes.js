const router = require("express").Router();

const viewsController = require("./../controllers/viewsController");
const moviesController = require("./../controllers/moviesController");
const castsController = require("./../controllers/castController");

router.use(viewsController);
router.use("/movies", moviesController);
router.use("/casts", castsController);

router.get("*", (req, res) => {
    res.render("404");
});

module.exports = router;