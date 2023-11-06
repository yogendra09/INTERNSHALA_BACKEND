const express = require("express");
const router = express.Router();
const {
  homepage,
  employesignup,
  employesignin,
  employesignout,
  currentEmploye,
  employesendmail,
  employeforgetlink,
  employeresetpassword,
  employeupdate,
  employeavatar,
  createinternship,
  readinternship,
  readsingleinternship,
  createjob,
  readjob,
  readsinglejob,
  deletejob,
  deleteidinternship,
  updateinternship,
  updatejob,
  studentapplied
} = require("../controllers/employeController");
const { isAuthenticated } = require("../middlewares/auth.js");

// GET
router.get("/", isAuthenticated, homepage);

// GET current user
router.post("/current", isAuthenticated, currentEmploye);

// POST /employe/signup
router.post("/signup", employesignup);

// POST /employe/signin
router.post("/signin", employesignin);

// GET /employe/signout
router.get("/signout", employesignout);

// POST /employe/send-mail
router.post("/send-mail", employesendmail);

// GET employe/forget-link/:id
router.post("/forget-link", employeforgetlink);

// POST employe/reset-password/:id
router.post("/reset-password", isAuthenticated, employeresetpassword);

// POST employe/update/:id-employe
router.post("/update/:id", isAuthenticated, employeupdate);

// POST employe/avtar/:id-employe
router.post("/avatar/:id", isAuthenticated, employeavatar);

//POST employe/internship/create
router.post("/internship/create", isAuthenticated, createinternship);

//POST employe/internship/delete/:id
router.post("/internship/delete/:id", isAuthenticated, deleteidinternship);

//POST employe/internship/update/:id
router.post("/internship/update/:id", isAuthenticated, updateinternship);

//POST employe/internship/read
router.post("/internship/read", isAuthenticated, readinternship);

//POST employe/internship/read/:id
router.post("/internship/read/:id", isAuthenticated, readsingleinternship);

//_____________________________job_______________________________

//POST employe/job/create
router.post("/job/create", isAuthenticated, createjob);

//POST employe/job/delete/:id
router.post("/job/delete/:id", isAuthenticated, deletejob);

//POST employe/job/update/:id
router.post("/job/update/:id", isAuthenticated, updatejob);

//POST employe/job/read
router.post("/job/read", isAuthenticated, readjob);

//POST employe/job/read/:id
router.post("/job/read/:id", isAuthenticated, readsinglejob);

router.post("/student/applied/internship", isAuthenticated, studentapplied);

module.exports = router;
