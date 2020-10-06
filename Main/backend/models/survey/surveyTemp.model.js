const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const surveyTempSchema = new Schema({
  title: {
    type: String,
    required: true, 
    unique: true
  },
  description: {
    type: String
  },
  docID: {
    type: mongoose.ObjectId,
    ref: "users",
    // required: true
  },
  pages: [{
    name: {
      type: String, 
      requied : true
    },
    elements : [{
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