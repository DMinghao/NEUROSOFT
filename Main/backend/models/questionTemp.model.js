const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const questionTempSchema = new Schema({
  questionTempName : {
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

const QuestionTemp = mongoose.model('QuestionTemp', questionTempSchema);
module.exports = QuestionTemp;