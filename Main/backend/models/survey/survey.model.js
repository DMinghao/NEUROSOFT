const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const surveySchema = new Schema({
  result : {
    type: String
  },
  paID : {
    type: mongoose.ObjectId, 
    ref : "users"
  },
  surveyTempID : {
    type: mongoose.ObjectId,
    ref: "surveyTemp"
  }, 
}, {
  timestamps: true
});

const Survey = mongoose.model('Survey', surveySchema);
module.exports = Survey;
