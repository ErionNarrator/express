const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const sequelize = require('../config/databese');
const Player = require('../config/player');
require('dotenv').config();
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
