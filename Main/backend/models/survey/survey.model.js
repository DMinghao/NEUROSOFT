const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Three parts of the survey model
const surveySchema = new Schema({
  result : {
    type: String
  },
  summary : {
    type: String
  },
  paID : {
    type: Schema.Types.ObjectId, 
    ref : "users", 
    required : true
  },
  surveyDisID : {
    type: Schema.Types.ObjectId,
    ref: "SurveyDis", 
    // required : true,
  } // add survey distribution
}, {
  timestamps: true
});

const Survey = mongoose.model('Survey', surveySchema);
module.exports = Survey;
