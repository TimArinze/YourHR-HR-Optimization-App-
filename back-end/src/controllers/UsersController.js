const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectId;

const User = require('../models/user')


class UsersController {
  static async postNew (req, res) {
    const { email, password, employeeID, firstName, lastName, DOB, department } = req.body
    if (!email) {
      res.status(400).json({error: 'Missing email'});
      return res
    }
    if (!password) {
      res.status(400).json({error: 'Missing password'})
      return res
    }
    if (!employeeID) {
      res.status(400).json({error: "Missing employee ID"})
    }
    if (!firstName) {
      res.status(400).json({error: 'Missing first name'})
      return res
    }
    if (!lastName) {
      res.status(400).json({error: 'Missing last name'})
      return res
    }
    if (!DOB) {
      res.status(400).json({error: 'Missing date of birth'})
      return res
    }
    if (!department) {
      res.status(400).json({error: 'Missing department'})
      return res
    }
    const hashedPassword = await bcrypt.hash(password, 11),
    user = {
      email,
      password: hashedPassword,
      employeeID,
      firstName,
      lastName,
      DOB,
      department
    }
    try {
      const newUser = await User.create(user)
      return res.status(201).json({id: newUser._id, email: newUser.email})
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({error: 'Already exist: either same email or employee ID'})
      }
    }    
  }
  static async getMe (req, res) {
    const token = req.get('X-token');
    const key = `auth_${token}`;
    const userID = await redisClient.get(key)
    if (!userID) {
      return res.status(401).json({error: "Unauthorized"})
    }
    const user = await User.findOne({_id: ObjectId(userID)})
    res.json({ email: user.email, id: user._id})
    return res
  }
}

module.exports = UsersController;