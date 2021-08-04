const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const defaultDue = 7*24*60*60*1000 // 7 days

const pas = mongoose.Schema(
  {
    paID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const surveyDisSchema = new Schema(
  {
    docID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    tempID: {
      type: Schema.Types.ObjectId,
      ref: "surveyTemp",
    },
    dueDate : {
      type : Date, 
      // default: (Date.now() + defaultDue).toString()
    },
    patients: [pas],
  },
  {
    timestamps: true,
  }
);

const SurveyDis = mongoose.model("SurveyDis", surveyDisSchema);
module.exports = SurveyDis;