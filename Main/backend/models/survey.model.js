const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const surveySchema = new Schema({
  result : {
    type: String
  },
  paID : {
    type: String
  },
  docID : {
    type: String
  }
}, {
  timestamps: true
});

const Survey = mongoose.model('Survey', surveySchema);
module.exports = Survey;
