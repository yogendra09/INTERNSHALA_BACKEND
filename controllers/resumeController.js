const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const student = require("../models/studentModel");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { v4: uuidv4 } = require("uuid");

exports.resume = catchAsyncErrors(async (req, res, next) => {
  const { resume } = await Student.findById(req.id).exec();
  res.json({ mesaage: "secure resume page !", resume });
});

exports.addeducation = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.education.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ mesaage: "education added!", student });
});

exports.editeducation = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const eduIndex = student.resume.education.findIndex(
    (i) => i.id === req.params.eduid
  );
  student.resume.education[eduIndex] = {
    ...student.resume.education[eduIndex],
    ...req.body,
  };

  await student.save();
  res.json({ mesaage: "education updated !", student });
});


exports.deleteteducation = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const Filterededu = student.resume.education.filter(
      (i) => i.id !== req.params.eduid
    );
    student.resume.education = Filterededu ;
  
    await student.save();
    res.json({ mesaage: "education deleted !", student });
  });