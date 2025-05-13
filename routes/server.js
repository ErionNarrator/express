const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
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
const app = express();
const PORT= 5000;

app.use(cors());
app.use(bodyParser.json());

sequelize.sync()
    .then(() => {
        console.log('Sequelize is running on port:', PORT, 'Database is running on port:', PORT);
    });
app.post('/api/register', async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const existingUser = await Player.findOne({where: {email: name}});
        if (existingUser) {
            res.status(400).json({user: existingUser});
        }
        const hashaedPassword = await bcrypt.hash(password, 10);
        const player = await Player.create({name, email, password: hashaedPassword});
        res.status(201).json({message: 'User registered successfully.', player});
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

app.post('/api/login', async (req, res) => {
    const {name, password} = req.body;
    try {
        const player = await  Player.findOne({where: {email: name}});
        if (!player) {
            return res.status(400).send({message: 'User does not exist'});
        }

        const isPasswordMatch = await bcrypt.compare(password, player.password);
        if (!isPasswordMatch){
            return res.status(401).send({message: 'User does not match'});
        }

        const token = jwt.sign({password: player.password}, process.env.JWT_SECRET, {expiresIn: '1d'});
        console.log({message: 'Login successfully.', token});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
})

app.get('/api/users', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send({message: 'No token provided'});
    }

    try {
        const token = jwt.sign({id: player.name}, process.env.JWT_SECRET, {expiresIn: '1h'});
        console.log('Generated token',token);
        res.json({message: 'User registered successfully.', token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = router;
