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
  readsinglejob 
} = require("../controllers/employeController");
const { isAuthenticated } = require("../middlewares/auth.js");

// GET
router.get("/", isAuthenticated, homepage);

// GET current user
router.post("/current", isAuthenticated ,currentEmploye);

// POST /employe/signup
router.post("/signup",employesignup);

// POST /employe/signin
router.post("/signin",employesignin);

// GET /employe/signout
router.get("/signout",employesignout);

// POST /employe/send-mail
router.post("/send-mail",employesendmail);

// GET employe/forget-link/:id
router.get("/forget-link/:id",employeforgetlink);

// POST employe/reset-password/:id
router.post("/reset-password",isAuthenticated,employeresetpassword);

// POST employe/update/:id-employe
router.post("/update/:id",isAuthenticated,employeupdate);

// POST employe/avtar/:id-employe
router.post("/avatar/:id",isAuthenticated,employeavatar);

//POST employe/internship/create
router.post("/internship/create",isAuthenticated,createinternship);


//POST employe/internship/read
router.post("/internship/read",isAuthenticated,readinternship);

//POST employe/internship/read/:id
router.post("/internship/read/:id",isAuthenticated,readsingleinternship);


//_____________________________job_______________________________

//POST employe/job/create
router.post("/job/create",isAuthenticated,createjob);


//POST employe/job/read
router.post("/job/read",isAuthenticated,readjob);

//POST employe/job/read/:id
router.post("/job/read/:id",isAuthenticated,readsinglejob);

module.exports = router;
