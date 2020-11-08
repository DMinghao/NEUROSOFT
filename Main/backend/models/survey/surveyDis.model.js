const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const surveyDisSchema = new Schema({
  docID: {
    type: Schema.Types.ObjectId, 
    ref: 'User',
  }, 
  tempID:{
    type: Schema.Types.ObjectId, 
    ref: 'surveyTemp',
  },
  patients:[{
    paID: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
    },
    completed: {
        type: Boolean,
        default: false
    }
}]
}, {
  timestamps: true
});

const SurveyDis = mongoose.model('SurveyDis', surveyDisSchema);
module.exports = SurveyDis;