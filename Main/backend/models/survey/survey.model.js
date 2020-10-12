const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const surveySchema = new Schema({
  result : {
    type: String
  },
  paID : {
    type: Schema.Types.ObjectId, 
    ref : "users", 
    required : true
  },
  surveyTempID : {
    type: Schema.Types.ObjectId,
    ref: "surveyTemp", 
    // required : true,
  } //add survey distribution
}, {
  timestamps: true
});

const Survey = mongoose.model('Survey', surveySchema);
module.exports = Survey;
