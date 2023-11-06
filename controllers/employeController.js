const ImageKit = require("imagekit");
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Employe = require("../models/employeModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendmail } = require("../utils/Nodemailer");
const imagekit = require("../utils/imagekit").initImagekit();
const path = require("path");
const { sendtoken } = require("../utils/SendToken");
const Internship = require("../models/InternshipModel");
const Job = require("../models/jobModel");
exports.homepage = catchAsyncErrors(async (req, res, next) => {
  res.json({ mesaage: "secure Employe homepage !" });
});

exports.currentEmploye = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.id)
    .populate("jobs")
    .populate("internships")
    .exec();
  console.log(employe);
  res.json(employe);
});

exports.employesignup = catchAsyncErrors(async (req, res, next) => {
  const employe = await new Employe(req.body).save();
  sendtoken(employe, 200, res);
  console.log(employe);
});

exports.employesignin = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findOne({ email: req.body.email })
    .select("+password")
    .exec();
  if (!employe)
    return next(
      new ErrorHandler("user not found with this email address", 404)
    );
  //  console.log(employe)
  const isMatch = employe.comparepassword(req.body.password);

  if (!isMatch) return next(new ErrorHandler("password does not match"), 403);

  sendtoken(employe, 200, res);
  res.send(isMatch);
});

exports.employesignout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "successfully signout" });
});

exports.employesendmail = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findOne({ email: req.body.email }).exec();

  if (!employe)
    return next(
      new ErrorHandler("user not found with this email address", 404)
    );

  const url = Math.floor(Math.random() * 9000 + 1000);

  sendmail(req, res, next, url);
  employe.resetPasswordToken = url;
  await employe.save();
  res.status(200).json({ employe, url });
});

exports.employeforgetlink = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findOne({ email: req.body.email }).exec();
  console.log(employe);
  if (!employe)
    return next(
      new ErrorHandler("user not found with this email address", 404)
    );

  if (employe.resetPasswordToken == req.body.otp) {
    employe.resetPasswordToken = "0";
    employe.password = req.body.password;
  } else {
    new ErrorHandler("ivalid Link ! please tyr again", 500);
  }

  await employe.save();
  res.status(200).json({ message: "password successfull changed" });
});

exports.employeresetpassword = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.id);
  employe.resetPasswordToken = "0";
  employe.password = req.body.password;
  await employe.save();
  sendtoken(employe, 200, res);
  res.status(200).json({ message: "password successfull reset" });
});

exports.employeupdate = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findByIdAndUpdate(
    req.params.id,
    req.body
  ).exec();
  res.status(200).json({ success: true, message: "updated employe!", employe });
});

exports.employeavatar = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.params.id);
  const file = req.files.organizationlogo;
  const modifiedfileName = `resumebuilder-${Date.now()}${path.extname(
    file.name
  )}`;
  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiedfileName,
  });

  if (employe.organizationlogo.fileId !== "") {
    await imagekit.deleteFile(employe.organizationlogo.fileId);
  }

  employe.organizationlogo = { fileId, url };
  await employe.save();

  res
    .status(200)
    .json({ success: true, message: "file uploaded successfully" });
});

//______________internship______________________________

exports.createinternship = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.id).exec();
  const internship = await Internship(req.body);
  
  internship.employe = employe._id;
  employe.internships.push(internship._id);
  await internship.save();
  await employe.save();
  console.log(employe,internship);
  res.status(200).json({internship });
});

exports.readinternship = catchAsyncErrors(async (req, res, next) => {
  const { internships } = await Employe.findById(req.id)
    .populate("internships")
    .exec();
  res.status(200).json({ internships });
});

exports.updateinternship = catchAsyncErrors(async (req, res, next) => {
  const  internships  = await Internship.findOneAndUpdate({
    _id:req.params.id
  },{
    profile:req.body.profile,
    skills:req.body.skills,
    internshiptype: req.body.internshiptype,
    openings:req.body.openings,
    from: req.body.from,
    to: req.body.to,
    resposibility: String,
    stipend: {
      status:req.body.status,
      amount:req.body.amount,
    },

    perks:req.body.perks,
    assesments:req.body.assesments,

    duration:req.body.duration,
  },{new:true});

  res.status(200).json({ internships });
});


exports.readsingleinternship = catchAsyncErrors(async (req, res, next) => {
  const internship = await Internship.findById(req.params.id).exec();
  res.status(200).json({ success: true, internship });
});

//_________________job___________________

exports.createjob = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.id).exec();
  const job = await Job(req.body);
  job.employe = employe._id;
  employe.jobs.push(job._id);
  await job.save();
  await employe.save();
  console.log(employe);
  res.status(200).json({  job });
});

exports.readjob = catchAsyncErrors(async (req, res, next) => {
  const { jobs } = await Employe.findById(req.id).populate("jobs").exec();
  res.status(200).json({ jobs });
});

exports.readsinglejob = catchAsyncErrors(async (req, res, next) => {
  const job = await Job.findById(req.params.id).exec();
  res.status(200).json({ success: true, job });
});


exports.deletejob = catchAsyncErrors(async (req, res, next) => {
  const job = await Job.findOneAndDelete({_id:req.params.id}).exec();
  res.status(200).json({ success: true, message:"job deleted" });
});


exports.updatejob = catchAsyncErrors(async (req, res, next) => {
  const job = await Job.findOneAndUpdate({_id:req.params.id},{
    tittle:req.body.tittle,
    skills:req.body.skills,
    jobtype:req.body.jobtype, 
    openings:req.body.openings,
    description:req.body.description,
    prefrences:req.body.prefrences,
    salary:req.body.salary, 
    perks:req.body.perks,
    assesments:req.body.assesments,
    responsibility:req.body.responsibility,
  },{new:true}).exec();
  res.status(200).json({ success: true, message:"job updated" });
});

exports.deleteidinternship = catchAsyncErrors(async (req, res, next) => {
  const job = await Internship.findOneAndDelete({_id:req.params.id}).exec();
  res.status(200).json({ success: true, message:"internship deleted" });
});


exports.studentapplied = catchAsyncErrors(async (req, res, next) => {
   const employe = await Employe.findOne({_id:req.id}).populate({
    path:"internships",
    populate:{
      path:"students"
    }
   }).populate({
    path:"jobs",
    populate:{
    path:"students"
    }

   }).exec();
   
   const internship = employe.internships.map((s)=>{
     return s;
    })
    
         const applied =   internship.map((s)=>{
            return s;
           })

           const [students] = applied

          //  const students = applied.students.map((stu)=>{
          //   return stu
          //  })
           console.log(students)

       res.json({response:students.students})
});
