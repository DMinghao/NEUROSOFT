const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const surveyTempSchema = new Schema({
  surveyTempName : {
    type: String, 
    required : true, 
  },
  docID : {
    type: String, 
    required : true
  },
  template : {
    type: String
  }
}, {
  timestamps: true
});

const SurveyTemp = mongoose.model('SurveyTemp', surveyTempSchema);
module.exports = SurveyTemp;