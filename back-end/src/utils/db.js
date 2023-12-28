const Mongoose = require('mongoose')
const User = require('../models/user')
const File = require('../models/file')

class DBClient {
  constructor () {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'YourHR';
    this.url = `mongodb://${this.host}:${this.port}`;

    Mongoose.connect(`mongodb://${this.host}:${this.port}/${this.database}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }).then(() => {
      console.log('Mongoose connected to database')
      this.connected = true
    }).catch((err) => {
      console.error('Mongoose could not connect to database', err)
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