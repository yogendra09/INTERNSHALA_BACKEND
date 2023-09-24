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
  const employe = await Employe.findById(req.id).exec();
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

  const url = `${req.protocol}://${req.get("host")}/employe/forget-link/${
    employe._id
  }`;

  sendmail(req, res, next, url);
  employe.resetPasswordToken = "1";
  await employe.save();
  res.status(200).json({ employe, url });
});

exports.employeforgetlink = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.params.id).exec();
  console.log(employe);
  if (!employe)
    return next(
      new ErrorHandler("user not found with this email address", 404)
    );

  if (employe.resetPasswordToken == "1") {
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
  employe.jobs.push(internship._id);
  await internship.save();
  await employe.save();
  console.log(employe);
  res.status(200).json({ success: true, internship });
});

exports.readinternship = catchAsyncErrors(async (req, res, next) => {
  const { jobs } = await Employe.findById(req.id)
    .populate("jobs")
    .exec();
  res.status(200).json({ success: true, jobs });
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
  res.status(200).json({ success: true, job });
});

exports.readjob  = catchAsyncErrors(async (req, res, next) => {
  const { jobs } = await Employe.findById(req.id).populate("jobs").exec();
  res.status(200).json({ success: true, jobs });
});

exports.readsinglejob  = catchAsyncErrors(async (req, res, next) => {
  const job = await Job.findById(req.params.id).exec();
  res.status(200).json({ success: true, job });
});
