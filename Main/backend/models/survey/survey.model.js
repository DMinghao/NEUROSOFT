const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const surveySchema = new Schema({
  result : {
    type: String
  },
  paID : {
    type: mongoose.ObjectId, 
    ref : "users", 
    required : true
  },
  surveyTempID : {
    type: mongoose.ObjectId,
    ref: "surveyTemp", 
    // required : true,
  }, 
}, {
  timestamps: true
});

const Survey = mongoose.model('Survey', surveySchema);
module.exports = Survey;
