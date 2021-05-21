const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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
  } 
}, {
  timestamps: true
});

const Survey = mongoose.model('Survey', surveySchema);
module.exports = Survey;
