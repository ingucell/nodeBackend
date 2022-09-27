const express = require('express')
const router = express.Router();
const authentication = require('../../controllers/authController')

const path = require('path')
router.post('/', authentication.handleLogin);

module.exports = router;