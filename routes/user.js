const express = require('express');
const { handleCreateNewUser, handleUserLogin } = require('../controllers/user');
const router = express.Router();

router.post('/', handleCreateNewUser)
router.post('/login', handleUserLogin)

module.exports = router;