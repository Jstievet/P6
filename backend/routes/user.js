const express = require('express');
const userRoutes = express.Router();
const userCtrl = require('../controllers/user.controllers');

userRoutes.post('/signup', userCtrl.signup);
userRoutes.post('/login', userCtrl.login);


module.exports = userRoutes;