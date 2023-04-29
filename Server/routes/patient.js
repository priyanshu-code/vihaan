const express = require("express");
const router = express.Router();

const { createPatient, getAllReports } = require("../controllers/patient");
router.route("/patient").post(createPatient).get(getAllReports);
module.exports = router;
