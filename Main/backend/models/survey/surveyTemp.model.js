const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const surveyTempSchema = new Schema({
  surveyTempName: {
    type: String,
    required: true,
  },
  docID: {
    type: mongoose.ObjectId,
    ref: "users",
    // required: true
  },
  pages: [{
    pageName: {
      type: String, 
      requied : true
    },
    questions : [{
      questionID : {
        type: mongoose.ObjectId, 
        ref : "questionTemp"
      }
    }, ]
  }],
}, {
  timestamps: true
});

const SurveyTemp = mongoose.model('SurveyTemp', surveyTempSchema);
module.exports = SurveyTemp;