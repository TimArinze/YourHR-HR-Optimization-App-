const Mongoose = require('mongoose')
const User = require('../models/user')
require('dotenv').config();
const File = require('../models/file')

class DBClient {
  constructor () {
    this.url = process.env.MONGO_URI;
    this.connected = false;

    Mongoose.connect(this.url)
    const db = Mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', () => {
      this.connected = true
      console.log('Database connected!')
    })
  }

  // method that checks if mongodb is connected
  isAlive() {
    return this.connected
  }

  // returns the number of documents in the collection "users"
  async nbUsers () {
    const count = await User.countDocuments();
    return count
  }

  // returns the number of documents in the collection "files"
  async nbFiles () {
    const count = await File.countDocuments();
    return count
  }
}

const dbClient = new DBClient;
module.exports = dbClient;