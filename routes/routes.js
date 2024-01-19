const router = require("express").Router();

const viewsController = require("./../controllers/viewsController");

router.use(viewsController);

module.exports = router;