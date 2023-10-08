const express = require("express");
const router = express.Router();
const {
  resume,
  addeducation,
  editeducation,
  deleteteducation,
  addjobs,
  editjobs,
  deletetjobs,
  addinternships,
  editinternships,
  deletetinternships,
  addresponsibilities,
  editresponsibilities,
  deletetresponsibilities,
  addcourses,
  editcourses,
  deletetcourses,
  addprojects,
  editprojects,
  deletetprojects,
  addskills,
  editskills,
  deletetskills,
  addaccomplishments,
  editaccomplishments,
  deletetaccomplishments

} = require("../controllers/resumeController");
const { isAuthenticated } = require("../middlewares/auth");

// GET
router.get("/", isAuthenticated, resume);

// POST add-education
router.post("/add-education", isAuthenticated, addeducation);

// POST Edit-education
router.post("/edit-education/:eduid", isAuthenticated, editeducation);

// POST delete-education
router.post("/delete-education/:eduid", isAuthenticated, deleteteducation);

//____________________jobs__________________________________

// POST add-jobs
router.post("/add-jobs", isAuthenticated, addjobs);

// POST Edit-jobs
router.post("/edit-jobs/:eduid", isAuthenticated, editjobs);

// POST delete-jobs
router.post("/delete-jobs/:eduid", isAuthenticated, deletetjobs);

//_________________Internships________________________

// POST add-internships
router.post("/add-internships", isAuthenticated, addinternships);

// POST Edit-internships
router.post("/edit-internships/:eduid", isAuthenticated, editinternships);

// POST delete-internships
router.post("/delete-internships/:eduid", isAuthenticated, deletetinternships);


//____________________responsibilities__________________________________

// POST add-jobs
router.post("/add-responsibilities", isAuthenticated, addresponsibilities);

// POST Edit-responsibilities
router.post("/edit-responsibilities/:eduid", isAuthenticated, editresponsibilities);

// POST delete-responsibilities
router.post("/delete-responsibilities/:eduid", isAuthenticated, deletetresponsibilities);

//____________________courses__________________________________

// POST add-courses
router.post("/add-courses", isAuthenticated, addcourses);

// POST Edit-courses
router.post("/edit-courses/:eduid", isAuthenticated, editcourses);

// POST delete-courses
router.post("/delete-courses/:eduid", isAuthenticated, deletetcourses);


//____________________projects__________________________________

// POST add-projects
router.post("/add-projects", isAuthenticated, addprojects);

// POST Edit-projects
router.post("/edit-projects/:eduid", isAuthenticated, editprojects);

// POST delete-projects
router.post("/delete-projects/:eduid", isAuthenticated, deletetprojects);


//____________________skills__________________________________

// POST add-skills
router.post("/add-skills", isAuthenticated, addskills);

// POST Edit-skills
router.post("/edit-skills/:eduid", isAuthenticated, editskills);

// POST delete-skills
router.post("/delete-skills/:eduid", isAuthenticated, deletetskills);

//____________________accomplishments__________________________________

// POST add-accomplishments
router.post("/add-accomplishments", isAuthenticated, addaccomplishments);

// POST Edit-accomplishments
router.post("/edit-accomplishments/:eduid", isAuthenticated, editaccomplishments);

// POST delete-accomplishments
router.post("/delete-accomplishments/:eduid", isAuthenticated, deletetaccomplishments);


module.exports = router;
