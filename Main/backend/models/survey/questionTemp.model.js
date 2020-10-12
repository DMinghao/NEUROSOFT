const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const questionTempSchema = new Schema({
  // what is question ID here?
  questionTempName : {
    type: String, 
    required : true, 
    unique: true
  },
  docID : {
    type: Schema.Types.ObjectId, 
    ref: "Users",
    required : true
  },
  Date : {
    type: String,
    required: true
  },
  template : {
    questionType: {
      type:String, 
      required : true, 
      trim: true,
      model: String

    }, 
    title:{
      type:String, 
      required:true
    }, 
    choices: Array, // how to show string array?
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