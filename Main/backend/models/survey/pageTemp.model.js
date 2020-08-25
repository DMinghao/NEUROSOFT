const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pageTempSchema = new Schema({
  pageTempName : {
    type: String, 
    required : true, 
  },
  docID : {
    type: ObjectId, 
    ref : "users", 
    required : true
  },
  template : {
    pageTitle : {
        type : String
    }, 
    visibleIf : {
        ref1:{
            type:String
        },
        constrain: {
            type:String
        }, 
        ref2:{
            type:String
        }
    },
    questions : [{
        questionId : {
            type: ObjectId, 
            ref: "questionTemp",
            required : true
        }
    }],
    required : true
  }
}, {
  timestamps: true
});

const PageTemp = mongoose.model('PageTemp', pageTempSchema);
module.exports = PageTemp;