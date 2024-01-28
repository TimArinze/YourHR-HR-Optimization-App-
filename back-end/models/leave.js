const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  userId: {type: String, required: true, trim: true, minlength: 3},
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
  CasualLeave: {
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
  },
  createdAt: { type: Date, default: Date.now},
  updatedAt: { type: Date, default: Date.now}
});

const Leave = mongoose.model('Leave', leaveSchema);

module.exports = Leave;