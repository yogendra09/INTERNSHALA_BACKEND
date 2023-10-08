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


  //___________________________jobs_________________________


exports.addjobs = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.jobs.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ mesaage: "education added!", student });
});


exports.editjobs = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const eduIndex = student.resume.jobs.findIndex(
    (i) => i.id === req.params.eduid
  );
  student.resume.jobs[eduIndex] = {
    ...student.resume.jobs[eduIndex],
    ...req.body,
  };

  await student.save();
  res.json({ mesaage: "jobs updated !", student });
});


exports.deletetjobs = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const Filterededu = student.resume.jobs.filter(
    (i) => i.id !== req.params.eduid
  );
  student.resume.jobs = Filterededu ;

  await student.save();
  res.json({ mesaage: "jobs deleted !", student });
});

  //___________________________Internships_________________________


  exports.addinternships = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.internships.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ mesaage: "internships added!", student });
  });
  
  
  exports.editinternships = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.internships.findIndex(
      (i) => i.id === req.params.eduid
    );
    student.resume.internships[eduIndex] = {
      ...student.resume.internships[eduIndex],
      ...req.body,
    };
  
    await student.save();
    res.json({ mesaage: "internships updated !", student });
  });
  
  
  exports.deletetinternships = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const Filterededu = student.resume.internships.filter(
      (i) => i.id !== req.params.eduid
    );
    student.resume.internships = Filterededu ;
  
    await student.save();
    res.json({ mesaage: "internships deleted !", student });
  });
  






  //___________________________responsibilities_________________________

  exports.addresponsibilities = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.responsibilities.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ mesaage: "responsibilities added!", student });
  });
  
  
  exports.editresponsibilities = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.responsibilities.findIndex(
      (i) => i.id === req.params.eduid
    );
    student.resume.responsibilities[eduIndex] = {
      ...student.resume.responsibilities[eduIndex],
      ...req.body,
    };
  
    await student.save();
    res.json({ mesaage: "responsibilities updated !", student });
  });
  
  
  exports.deletetresponsibilities = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const Filterededu = student.resume.responsibilities.filter(
      (i) => i.id !== req.params.eduid
    );
    student.resume.responsibilities = Filterededu ;
  
    await student.save();
    res.json({ mesaage: "responsibilities deleted !", student });
  });



  //___________________________courses_________________________



  exports.addcourses = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.courses.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ mesaage: "education added!", student });
  });
  
  
  exports.editcourses = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.courses.findIndex(
      (i) => i.id === req.params.eduid
    );
    student.resume.courses[eduIndex] = {
      ...student.resume.courses[eduIndex],
      ...req.body,
    };
  
    await student.save();
    res.json({ mesaage: "courses updated !", student });
  });
  
  
  exports.deletetcourses = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const Filterededu = student.resume.courses.filter(
      (i) => i.id !== req.params.eduid
    );
    student.resume.courses = Filterededu ;
  
    await student.save();
    res.json({ mesaage: "courses deleted !", student });
  });
  



  //__________________________projects_________________________



  exports.addprojects = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.projects.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ mesaage: "projects added!", student });
  });
  
  
  exports.editprojects = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.projects.findIndex(
      (i) => i.id === req.params.eduid
    );
    student.resume.projects[eduIndex] = {
      ...student.resume.projects[eduIndex],
      ...req.body,
    };
  
    await student.save();
    res.json({ mesaage: "projects updated !", student });
  });
  
  
  exports.deletetprojects = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const Filterededu = student.resume.projects.filter(
      (i) => i.id !== req.params.eduid
    );
    student.resume.projects = Filterededu ;
  
    await student.save();
    res.json({ mesaage: "projects deleted !", student });
  });
  



  //___________________________skills_________________________



  exports.addskills = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.skills.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ mesaage: "education added!", student });
  });
  
  
  exports.editskills = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.skills.findIndex(
      (i) => i.id === req.params.eduid
    );
    student.resume.skills[eduIndex] = {
      ...student.resume.skills[eduIndex],
      ...req.body,
    };
  
    await student.save();
    res.json({ mesaage: "skills updated !", student });
  });
  
  
  exports.deletetskills = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const Filterededu = student.resume.skills.filter(
      (i) => i.id !== req.params.eduid
    );
    student.resume.skills = Filterededu ;
  
    await student.save();
    res.json({ mesaage: "skills deleted !", student });
  });
  




  //___________________________accomplishments_________________________

  exports.addaccomplishments = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.accomplishments.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ mesaage: "education added!", student });
  });
  
  
  exports.editaccomplishments = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.accomplishments.findIndex(
      (i) => i.id === req.params.eduid
    );
    student.resume.accomplishments[eduIndex] = {
      ...student.resume.accomplishments[eduIndex],
      ...req.body,
    };
  
    await student.save();
    res.json({ mesaage: "accomplishments updated !", student });
  });
  
  
  exports.deletetaccomplishments = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const Filterededu = student.resume.accomplishments.filter(
      (i) => i.id !== req.params.eduid
    );
    student.resume.accomplishments = Filterededu ;
  
    await student.save();
    res.json({ mesaage: "accomplishments deleted !", student });
  });
  