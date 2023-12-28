const redisClient = require('../utils/redis')
const dbClient = require('../utils/db');

class AppController {
  static async getStatus (req, res) {
    const redisAlive = await redisClient.isAlive()
    const dbAlive = await dbClient.isAlive()
    res.status(200);
    res.json({
      redis: redisAlive,
      db: dbAlive
    })
    return res
  }

  static async getStats (req, res) {
    const usersCount = await dbClient.nbUsers()
    const filesCount = await dbClient.nbFiles()
    res.status = 200;
    res.json({
      users: usersCount,
      files: filesCount
    })
    return res
  }
}

module.exports = AppController;