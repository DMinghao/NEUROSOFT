const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String, 
    required: true, 
    unique: true, 
    trim: true, 
    minlength: 3
  }, 
  password: {
    type: String, 
    required: true
  }, 
  userType: { 
    type: String, 
    required: true
  }, 
  firstname: {
    type: String,
    trim: true,
    required: true
  },
  lastname: {
    type: String,
    trim: true,
    required: true
  },
  relatedUsers:[{
      type: Schema.Types.ObjectId, 
      ref: 'User',
      unique: true
    }]
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
