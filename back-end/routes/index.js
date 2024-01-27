const express = require('express');

const router = express.Router();

const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');
const AuthController = require('../controllers/AuthController');
const FilesController = require('../controllers/FilesController');
const LeavesController = require('../controllers/LeavesController');


router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.post('/register', UsersController.postNew);
router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.get('/users/me', UsersController.getMe);
router.post('/files', FilesController.postUpload);
router.get('/holidays/:year', LeavesController.getHolidays);
router.post('/leave/apply', LeavesController.postLeave);

module.exports = router;
