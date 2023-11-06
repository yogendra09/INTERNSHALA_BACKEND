const ImageKit = require("imagekit");
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendmail } = require("../utils/Nodemailer");
const { sendtoken } = require("../utils/SendToken");
const imagekit = require("../utils/imagekit").initImagekit();
const path = require("path");
const Internship = require("../models/InternshipModel");
const Job = require("../models/jobModel");
const job = require("../models/jobModel");

exports.homepage = catchAsyncErrors(async (req, res, next) => {
  res.json({ mesaage: "secure homepage !" });
});

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id)
    .populate("jobs")
    .populate("internships")
    .exec();

  res.json({ student });
});

exports.studentsignup = catchAsyncErrors(async (req, res, next) => {
  const student = await new Student(req.body).save();
  sendtoken(student, 200, res);
  console.log(student);
  res.json({ student });
});

exports.studentsignin = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
  const student = await Student.findOne({ email: req.body.email })
    .select("+password")
    .exec();
  if (!student)
    return next(
      new ErrorHandler("user not found with this email address", 404)
    );

  const isMatch = student.comparepassword(req.body.password);

  if (!isMatch) return next(new ErrorHandler("password does not match"), 403);

  sendtoken(student, 200, res);
});

exports.studentsignout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "successfully signout" });
});

exports.studentsendmail = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email }).exec();

  if (!student)
    return next(
      new ErrorHandler("user not found with this email address", 404)
    );

  const url = Math.floor(Math.random() * 9000 + 1000);
  const mailOptions = {
    from:"Master Pvt. Ltd <hi.yogesh09@gmail.com>",
    to: req.body.email,
    subject:"Password Reset Link",
    "text":"do not share this link",
    html:`<h1>click link blow to reset password</h1>
    <a href="${url}">your otp is ${url}</a>`,

}
  sendmail(req, res, next, url ,mailOptions);
  student.resetPasswordToken = `${url}`;
  await student.save();
  res.status(200).json({ student, url });
});

exports.studentforgetlink = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email }).exec();
  console.log(student);
  if (!student)
    return next(
      new ErrorHandler("user not found with this email address", 404)
    );

  if (student.resetPasswordToken == req.body.otp) {
    student.resetPasswordToken = "0";
    student.password = req.body.password;
    await student.save();
  } else {
    new ErrorHandler("ivalid Link ! please tyr again", 500);
  }

  res.status(200).json({ message: "password successfull changed" });
});

exports.studentresetpassword = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id);
  student.resetPasswordToken = "0";
  student.password = req.body.password;
  await student.save();
  sendtoken(student, 200, res);
  res.status(200).json({ message: "password successfull reset" });
});

exports.studentupdate = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    req.body
  ).exec();
  res.status(200).json({ success: true, message: "updated student!", student });
});

exports.studentavatar = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.params.id);
  const file = req.files.avatar;
  const modifiedfileName = `resumebuilder-${Date.now()}${path.extname(
    file.name
  )}`;
  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiedfileName,
  });

  if (student.avatar.fileId !== "") {
    await imagekit.deleteFile(student.avatar.fileId);
  }

  student.avatar = { fileId, url };
  await student.save();

  res
    .status(200)
    .json({ success: true, message: "file uploaded successfully" });
});

//_________apply Internship___________________

exports.applyinternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const internship = await Internship.findById(req.params.internshipid).exec();
  student.internships.push(internship._id);
  internship.students.push(student._id);
  await student.save();
  await internship.save();
  console.log(req.params.internshipid)
  const mailOptions = {
    from:"Master Pvt. Ltd <hi.yogesh09@gmail.com>",
    to: student.email,
    subject:"you successfully applied for this internship",
    "text":"BEST OF LUCK",
    html:`<h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, optio</h1>`,

}
  sendmail( res, next ,mailOptions);

  // console.log(student, internship);
});

//_________apply job___________________

exports.applyjob = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const job = await Job.findById(req.params.jobid).exec();
  student.jobs.push(job._id);
  job.students.push(student._id);
  await student.save();
  await job.save();
  const mailOptions = {
    from:"Master Pvt. Ltd <hi.yogesh09@gmail.com>",
    to: student.email,
    subject:"you successfully applied for this job role",
    "text":"BEST OF LUCK",
    html:`<h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, optio</h1>`,

}
  sendmail( res, next ,mailOptions);
  res.json({ student, job });
});

exports.readalljobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find().exec();
  res.status(200).json({ jobs });
});

exports.readallinternships = catchAsyncErrors(async (req, res, next) => {
  const internships = await Internship.find().exec();
  console.log(internships);
  res.status(200).json({ internships });
});

exports.findspecificjobs = catchAsyncErrors(async(req,res,next)=>{
  const specificjobs = await job.find({tittle:"sde"});
  console.log(specificjobs);
  res.json({specificjobs})
   
})