const { MongoClient } = require('mongodb')

class DBClient {
  constructor () {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.url = `mongodb://${this.host}:${this.port}`;
    // Create a new MongoClient
    this.client = new MongoClient(this.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    this.connected = false;
    // Connect the client to the server
    this.client.connect().then(() => {
      //for isAlive function
      this.connected = true
    }).catch((err) => {
        console.error("Mongodb not connecting")
    }).finally(() => {
        this.client.close()
    })
  }

  // method that checks if mongodb is connected
  isAlive() {
    return this.connected
  }

  // returns the number of documents in the collection "users"
  async nbUsers () {
    const db = this.client.db(this.database);
    const collection = db.collection('users');
    const count = await collection.countDocuments();
    return count
  }

  // returns the number of documents in the collection "files"
  async nbFiles () {
    const db = this.client.db(this.database);
    const collection = db.collection('files');
    const count = await collection.countDocuments();
    return count
  }
}

const dbClient = new DBClient;
module.exports = dbClient;