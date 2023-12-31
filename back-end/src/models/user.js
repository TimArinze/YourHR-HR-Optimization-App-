const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, trim: true, minlength: 3, unique: true },
  password: {type: String, required: true, trim: true, minlength: 3},
  firstName: {type: String, required: true, trim: true, minlength: 3},
  lastName: {type: String, required: true, trim: true, minlength: 3},
  
  DOB: {type: Date, required: true, trim: true, minlength: 3},
  gender: {type: String, required: true, trim: true, minlength: 3},
  maritalStatus: {type: String, required: false, trim: true, minlength: 3},
  bloodGroup: {type: String, required: false, trim: true, minlength: 3},
  phoneNumber: {type: String, required: true, trim: true, minlength: 3},
  address: {type: String, required: true, trim: true, minlength: 3},
  city: {type: String, required: true, trim: true, minlength: 3},

  department: {type: String, required: true, trim: true, minlength: 3},
  employeeID: {type: String, required: true, trim: true, minlength: 3, unique: true},
  yearsOfExperience: {type: Number, required: false, trim: true, minlength: 1},
  position: {type: String, required: false, trim: true, m6inlength: 3},
  manager: {type: String, required: false, trim: true, minlength: 3},
  dateOfJoining: {type: Date, required: true, trim: true, minlength: 3},
  roles: {type: String, required: true, trim: true, minlength: 3},
  currentOfficeLocation: {type: String, required: false, trim: true, minlength: 3},
  salary: {type: Number, required: false, trim: true, minlength: 1},

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  AnnualLeave: {
    total: {type: Number, default: 20, required: true},
    used: {type: Number, default: 0, required: true},
    remaining: {type: Number, default: 20, required: true},
    requested: {type: Number, default: 0, required: true},
  },
  SickLeave: {
    total: {type: Number, default: 0, required: true},
    used: {type: Number, default: 0, required: true},
    remaining: {type: Number, default: 0, required: true},
    requested: {type: Number, default: 0, required: true}
  },
  casualLeave: {
    total: {type: Number, default: 7, required: true},
    used: {type: Number, default: 0, required: true},
    requested: {type: Number, default: 0, required: true},
    remaining: {type: Number, default: 7, required: true},
  },
  MaternityLeave: {
    total: {type: Number, default: 0, required: true},
    used: {type: Number, default: 0, required: true},
    requested: {type: Number, default: 0, required: true},
    remaining: {type: Number, default: 0, required: true}
  } 
});
// format for postman;
// '{ "email": "bob@dylan.com", "password": "toto1234!", "firstName": "bob",
//  "lastName": "dylan", "DOB": "1999-01-01", "department": "Marketing", "employeeID": "SR1000"}'

const User = mongoose.model('User', userSchema);

module.exports = User;