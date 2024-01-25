const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, trim: true, minlength: 3, unique: true },
  password: {type: String, required: true, trim: true, minlength: 3},
  firstName: {type: String, required: true, trim: true, minlength: 3},
  lastName: {type: String, required: true, trim: true, minlength: 3},
  
  DOB: {type: Date, required: true, trim: true, minlength: 3},
  gender: {type: String, required: true, trim: true, minlength: 3},
  maritalStatus: {type: String, required: false, trim: true, minlength: 3},
  bloodGroup: {type: String, required: false, trim: true},
  phoneNumber: {type: String, required: false, trim: true, minlength: 3},
  address: {type: String, required: false, trim: true, minlength: 3},
  city: {type: String, required: false, trim: true},

  department: {type: String, required: true, trim: true},
  employeeID: {type: String, required: true, trim: true, unique: true},
  yearsOfExperience: {type: Number, required: false, trim: true, minlength: 1},
  position: {type: String, required: false, trim: true,},
  manager: {type: String, required: false, trim: true, minlength: 3},
  DOJ: {type: Date, required: true, trim: true, minlength: 3},
  roles: {type: String, required: false, trim: true, minlength: 3},
  currentOfficeLocation: {type: String, required: false, trim: true, minlength: 3},
  salary: {type: Number, required: false, trim: true, minlength: 1},

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
// format for postman;
// '{ "email": "bob@dylan.com", "password": "toto1234!", "firstName": "bob",
//  "lastName": "dylan", "DOB": "1999-01-01", "department": "Marketing", "employeeID": "SR1000"}'

const User = mongoose.model('User', userSchema);

module.exports = User;