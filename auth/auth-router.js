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

    console.log(user)

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
      })
        .catch(error => {
            res.status(500).json(error);
      });
})


module.exports = router;