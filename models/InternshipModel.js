// const{ default: mongoose} = require("mongoose");
const mongoose = require("mongoose");

const internshipModel = new mongoose.Schema(
  {
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
      },
    ],
    employe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employe",
    },

    profile: {
      type: String,
    },
    skills: String,
    internshiptype: {
      type: String,
      enum: ["In office", "Remote"],
    },
    openings: Number,
    from: String,
    to: String,
    resposibility: String,
    stipend: {
      status: {
        type: String,
        enum: ["fixed", "negotiable", "performance based", "unpaid"],
      },
      amount: Number,
    },

    perks: String,
    assesments: String,

    duration: String,
  },
  { timestamps: true }
);

const internship = mongoose.model("internship", internshipModel);
module.exports = internship;
