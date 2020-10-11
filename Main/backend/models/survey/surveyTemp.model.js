const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const surveyTempSchema = new Schema({
  //
  //Do I need surveytempID here?
  title: {
    type: String,
    required: true, 
    unique: true
  },
  description: {
    type: String,
    required: true
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
  pages: [{
    name: {
      type: String, 
      requied : true
    },
    elements : [{
      questionID : {
        type: Schema.Types.ObjectId, 
        ref : "questionTemp"
      }
    }, ]
  }],
}, {
  timestamps: true
});

const SurveyTemp = mongoose.model('SurveyTemp', surveyTempSchema);
module.exports = SurveyTemp;