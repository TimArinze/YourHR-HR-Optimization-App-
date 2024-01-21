const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');
const File = require('../models/file');
const User = require('../models/user')
const ObjectId = require('mongodb').ObjectId;
const fs = require('fs');

class FilesController {
  static async postUpload (req, res) {
    const token = req.get('X-token');
    const key = `auth_${token}`;
    const userID = await redisClient.get(key);
    if (!userID) {
      return res.status(401).json({error: 'Unauthorized'});
    }
    const { name, type, isPublic, data } = req.body;
    if (!name) {
      return res.status(400).json({error: 'Missing name'});
    }
    if (!type) {
      return res.status(400).json({error: 'Missing type'});
    }
    if (!data && (type === 'file' || type === 'image')) {
      return res.status(400).json({error: 'Missing data'});
    }
    const user = await User.findById(ObjectId(userID));
    if (!user) {
      return res.status(401).json({error: 'Unauthorized'});
    }
    const fileCheck = await File.findOne({name, folderName: user.employeeID});
    if (fileCheck) {
      await File.deleteOne({name, folderName: user.employeeID});
    }
    const localPath = `${process.env.FOLDER_PATH || '/tmp/YourHR'}/${user.employeeID}/${name}`;
    const file = {
      userId: userID,
      name: name,
      type: type,
      isPublic: isPublic,
      folderName: user.employeeID,
      data: data,
      localPath: localPath
    };
    if (!fs.existsSync(`/tmp/YourHR/${user.employeeID}`)) {
      fs.mkdirSync(`/tmp/YourHR/${user.employeeID}`, { recursive: true });
    }
    const dataBuffer = Buffer.from(data, 'base64');

    fs.writeFile(localPath, dataBuffer, (err) => {
      if (err) {
        return res.status(400).json({error: 'Could not write file to local path successfully'});
      }
      console.log('File written successfully');
      return true;
    });
    const newFile = await File.create(file);
    return res.status(201).json({
      id: newFile._id,
      userId: newFile.userId,
      name: newFile.name,
      type: newFile.type,
      isPublic: newFile.isPublic,
      folderName: newFile.folderName
    });
  }
}


module.exports = FilesController;