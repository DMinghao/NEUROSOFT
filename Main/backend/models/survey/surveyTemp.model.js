const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const surveyTempSchema = new Schema({
  title: {
    type: String,
    required: true, 
    unique: true
  }, 
  date:{
    type: String,
    required: true
  },
  docID: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  template :{
    type: String,
    requried: true
  }, 
  questionCount : { 
    type: Number
  }
}, {
  timestamps: true
});

const SurveyTemp = mongoose.model('SurveyTemp', surveyTempSchema);
module.exports = SurveyTemp;