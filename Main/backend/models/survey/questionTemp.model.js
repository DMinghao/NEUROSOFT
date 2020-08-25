const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const questionTempSchema = new Schema({
  questionTempName : {
    type: String, 
    required : true, 
  },
  docID : {
    type: ObjectId, 
    required : true
  },
  template : {
    questionType: {
      type:String, 
      required : true
    }, 
    title:{
      type:String, 
      required:true
    }, 
    isRequired: {
      type: String
    }, 
    inputType:{
      type:String
    }
  }
}, {
  timestamps: true
});

const QuestionTemp = mongoose.model('QuestionTemp', questionTempSchema);
module.exports = QuestionTemp;