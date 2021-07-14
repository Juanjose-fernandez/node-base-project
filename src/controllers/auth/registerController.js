const bcrypt = require("bcrypt");

var jwt2 = require("jsonwebtoken");
const User = require("../../models/User");

const registerCtrl = {};

// Método que registra un nuevo usuario en la plataforma
// @param {credentials}
// @return user with generated jwt.
registerCtrl.register = async (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({
    username,
    password,
  });

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  newUser.password = await bcrypt.hash(newUser.password, salt);

  // Save new user
  newUser
    .save()
    .then((user) => {
      // MAYBE: Generate JWT and return it with user data for client auto login when register.
      res.json({
        msg: "User registered:",
        user: newUser,
      });
    })
    .then((user) => {
      // TODO: Send Confirmation email.
    });
};

module.exports = registerCtrl;
