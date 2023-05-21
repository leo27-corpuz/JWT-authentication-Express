const express = require('express')
const router = express.Router()
const { login } = require('../../src/controllers/authController')
router.route('/login').post(login)
module.exports = router