const express = require("express");

//Controllers
const repairController = require("../controllers/repairs.controllers.js");

//Middleware
const repairMiddleware = require("../middlewares/repairs.middleware");
const authMiddleware = require("../middlewares/auth.middlewares.js");
const validation = require("../middlewares/validations.middlewares.js");

const router = express.Router();

router.post(
  "/",
  validation.CreateRepairValidation,
  repairMiddleware.validRepair,
  repairController.create
);

router.use(authMiddleware.protect);

router.use(authMiddleware.restrictTo("employee"));

router.get("/", repairController.findAll);

router
  .route("/:id")
  .get(repairMiddleware.validExistRepair, repairController.findOne)
  .patch(repairMiddleware.validExistRepair, repairController.update)
  .delete(repairMiddleware.validExistRepair, repairController.delete);

module.exports = router;
