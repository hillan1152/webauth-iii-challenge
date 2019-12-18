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

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
      })
        .catch(error => {
            res.status(500).json(error);
      });
});

// LOGIN WITH JWT
router.post('/login', (req, res) => {
    let { username, password } = req.body

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)){
                // CREATES TOKEN
                const token = makeToken(user);

                res.status(200).json({
                    token,
                    message: "Welcome!"
                })
            } else {
                res.status(401).json({ message: 'You shall not pass!' })
            }
        })
        .catch(error => {
            res.status(500).json(error);
          });
})





// Create Login Token
function makeToken(user){
    const payload = {
        username: user.username,
        department: user.department
    };
    const secret = process.env.JWT_SECRET || "This is a secret";

    const options = {
        expiresIn: "1h",
    }
    return jwt.sign(payload, secret, options);
}


module.exports = router;