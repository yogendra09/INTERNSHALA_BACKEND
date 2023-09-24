const express = require("express");
const router = express.Router();
const { resume, addeducation, editeducation, deleteteducation } = require("../controllers/resumeController") 
const { isAuthenticated } = require("../middlewares/auth");


// GET
router.get("/", isAuthenticated ,resume)


// POST add-education
router.post("/add-education",isAuthenticated ,addeducation)

// POST Edit-education
router.post("/edit-education/:eduid",isAuthenticated ,editeducation)

// POST delete-education
router.post("/delete-education/:eduid",isAuthenticated ,deleteteducation)

module.exports = router
