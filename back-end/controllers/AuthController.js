const dbClient = require('../utils/db')
const redisClient = require('../utils/redis')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user')

class AuthController {
  static async getConnect (req, res) {
    const auth = req.get('Authorization')

    //to remove the Basic and just take the encoded number
    const authBasicStripped = auth.split(' ')[1];

    // changing it to buffer of something
    const authDecoded = Buffer.from(authBasicStripped, 'base64');
    const authToString = authDecoded.toString('utf-8');
    const [email, password] = authToString.split(':');
    if (!email || !password) {
      return res.status(401).json({error: "Unauthorized"});
    }
    try {
      const user = await User.findOne({email});
      if (!user) {
        return res.status(401).json({error: "User not found"})
      }
      const hashedPassword = user.password;
      const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
      if (!isPasswordCorrect) {
        return res.status(401).json({error: "Unauthorized"});
      }
      // Generating random token
      const authToken = uuidv4()
      const key = `auth_${authToken}`
      await redisClient.set(`${key}`, `${user._id.toString()}`, 86400);
      return res.status(200).json({ token: authToken});
    } catch(err) {
      console.log(err)
      return res.status(401).json({error: "Unauthorized"})
    }
  }

  static async getDisconnect (req, res) {
    const token = req.get('X-token');
    const key = `auth_${token}`;
    const userID = await redisClient.get(key)
    if (!userID) {
      return res.status(401).json({error: 'Unauthorized'})
    }
    await redisClient.del(key);
    return res.status(204).json('');
  }
}

module.exports = AuthController;
