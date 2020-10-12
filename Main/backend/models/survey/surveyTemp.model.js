const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const surveyTempSchema = new Schema({
  //
  //Do I need surveytempID here? // Template ID no need --MD
  title: {
    type: String,
    required: true, 
    unique: true
  }, //Add discription, string not required --MD
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

  }
}, {
  timestamps: true
});

const SurveyTemp = mongoose.model('SurveyTemp', surveyTempSchema);
module.exports = SurveyTemp;