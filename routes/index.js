const router = require("express").Router();
const adminRoute = require("./admin.router");
const publicRoute = require("./public.router");

router.use("/public", publicRoute);
router.use("/admin", adminRoute);

module.exports = router