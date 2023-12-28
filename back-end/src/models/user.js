const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, trim: true, minlength: 3, unique: true },
  password: {type: String, required: true, trim: true, minlength: 3},
  firstName: {type: String, required: true, trim: true, minlength: 3},
  lastName: {type: String, required: true, trim: true, minlength: 3},
  
  DOB: {type: Date, required: true, trim: true, minlength: 3},
  department: {type: String, required: true, trim: true, minlength: 3},
  employeeID: {type: String, required: true, trim: true, minlength: 3, unique: true},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  AnnualLeave: {
    total: {type: Number, default: 20, required: true},
    used: {type: Number, default: 0, required: true},
    remaining: {type: Number, default: 20, required: true},
    requested: {type: Number, default: 0, required: true},
  },
  SickLeave: {type: Number, default: 0, required: true},
  casualLeave: {
    total: {type: Number, default: 7, required: true},
    used: {type: Number, default: 0, required: true},
    remaining: {type: Number, default: 7, required: true},
  }
});
// format for postman;
// '{ "email": "bob@dylan.com", "password": "toto1234!", "firstName": "bob",
//  "lastName": "dylan", "DOB": "1999-01-01", "department": "Marketing", "employeeID": "SR1000"}'

const User = mongoose.model('User', userSchema);

module.exports = User;