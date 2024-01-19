const router = require("express").Router();

const viewsController = require("./../controllers/viewsController");
const moviesController = require("./../controllers/moviesController");

router.use(viewsController);
router.use(moviesController);

module.exports = router;