// IMPORT DEPENDENCIES
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// IMPORT MODELS
const Users = require('../model/user-model');

// END POINTS FOR /API/
router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
})


module.exports = router;