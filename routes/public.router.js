const router = require("express").Router();
const controller = require("../controllers/photo.controller");

router.get("/album", controller.getAlbums);
router.get("/album/:id", controller.getPhotos);

module.exports = router;
