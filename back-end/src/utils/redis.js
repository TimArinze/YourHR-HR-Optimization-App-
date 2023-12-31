const redis = require('redis')

class RedisClient {
  constructor() {
    // Create a new Redis client
    this.client = redis.createClient({
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
    });

    // Log Redis errors to the console
    this.client.on('error', (error) => {
      console.error('Redis Error:', error)
    });
  }

    // isAlive returns true if the connection is Ok or false otherwise
    isAlive() {
      if (this.client.connected) {
        return true;
      }
      return false;
    }

    // get returns the value of a key in Redis
    async get(key) {
      return new Promise((resolve, reject) => {
        this.client.get(key, (err, data) => {
          if (err) reject(err);
          resolve(data);
        });
      
      });
    };

    // set saves a key value pair in Redis for a given time in seconds
    async set(key, value, duration) {
      return new Promise((resolve, reject) => {
        this.client.set(key, value, 'EX', duration, (err, data) => {
          if (err) reject(err);
          resolve(data);
        });
      });
    }

    // del deletes a key in Redis
    async del(key) {
      return new Promise((resolve, reject) => {
        this.client.del(key, (err, data) => {
          if (err) reject(err);
          resolve(data);
        });
      })
    }
}

// Instantiate Redis and export it
const redisClient = new RedisClient();
module.exports = redisClient;