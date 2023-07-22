const router = require("express").Router();
const { getAllTrains, getTrainById } = require("../controllers/train");

router.get("/", getAllTrains);

router.get("/train/:id", getTrainById);

module.exports = router;
