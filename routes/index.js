var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);
router.put('/users/:name', userController.updateUser);
router.delete('/users/:name', userController.deleteUser);

module.exports = router;
