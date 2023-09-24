// const{ default: mongoose} = require("mongoose");
const mongoose = require("mongoose");


const jobModel = new mongoose.Schema(
  {
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
      },
    ],
    tittle: {
      type: String,
    },
    skills:String,
    jobtype:{
        type:String,
        enum:["In office","Remote"]
    }, 
    openings:Number,
    description:String,
    prefrences:String,
    salary:Number, 
    perks:String,
    assesments:String,
    responsibility:String, 
    employe: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employe",
      },
    ],
  },
  { timestamps: true }
);

const job = mongoose.model("job", jobModel);
module.exports = job;
 