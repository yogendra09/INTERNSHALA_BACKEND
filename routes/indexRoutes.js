const express = require("express");
const router = express.Router();
const {
  homepage,
  studentsignup,
  studentsignin,
  studentsignout,
  currentUser,
  studentsendmail,
  studentforgetlink,
  studentresetpassword,
  studentupdate,
  studentavatar,
  applyinternship,
  applyjob,
  readalljobs,
  readallinternships,
  findspecificjobs,
} = require("../controllers/indexController.js");
const { isAuthenticated } = require("../middlewares/auth.js");

// GET
router.get("/", homepage);

// GET current user
router.post("/student", isAuthenticated, currentUser);

// POST /student/signup
router.post("/student/signup", studentsignup);

// POST /student/signin
router.post("/student/signin", studentsignin);

// GET /student/signout
router.get("/student/signout",isAuthenticated ,studentsignout);

// POST /student/send-mail
router.post("/student/send-mail", studentsendmail);

// GET student/forget-link/:id
router.post("/student/forget-link", studentforgetlink);

// POST student/reset-password/:id
router.post("/student/reset-password/:id", isAuthenticated, studentresetpassword);

// POST student/update/:id-student
router.post("/student/update/:id", isAuthenticated, studentupdate);

// POST student/avtar/:id-student
router.post("/student/avatar/:id", isAuthenticated, studentavatar);


router.post("/student/alljobs",isAuthenticated,readalljobs)


router.post("/student/allinternships",isAuthenticated,readallinternships)

//___________apply internship __________

// POST /apply/:internshipid
router.post("/student/apply/internship/:internshipid", isAuthenticated, applyinternship);

//___________apply jobs __________

// POST /apply/:jobid
router.post("/student/apply/job/:jobid", isAuthenticated, applyjob);

// specific jobs
router.get("/specificjobs",findspecificjobs);



module.exports = router;
