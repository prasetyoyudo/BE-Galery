const router = require("express").Router();
const controller = require("../controllers/photo.controller");

router.post("/photo", controller.addPhoto);
router.put("/photo/name/:id", controller.updatePhotoName);
router.put("/photo/album/:id", controller.updatePhotoAlbum);
router.delete("/photo/:id", controller.deletePhoto);
router.delete("/album/:id", controller.deletePhotoAlbum);

module.exports = router;
