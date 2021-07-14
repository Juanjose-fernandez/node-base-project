const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const User = require("../../models/User");

const loginCtrl = {};

// Método que registra un nuevo usuario en la plataforma
// @param {credentials}
// @return user with generated jwt.
loginCtrl.login = async (req, res) => {
  const { username, password } = req.body;
  const userData = new User({
    username,
    password,
  });

  const user = await User.findOne({ username });
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      // Generate JWT and return it with user data.
      console.log("*** comienza generacion token*****");
      const payload = {
        sub: user._id,
        iat: Date.now() + parseInt(process.env.JWT_EXPIRATION),
        username: user.username,
      };
      const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET, {
        algorithm: process.env.JWT_ALGORITHM,
      });
      res.json({ data: { token: token }, user: { username } });
      console.log("Token: " + token + "Generated for user:" + user.username);
    } else {
      res.status(400).json({ error: "Invalid Password" });
    }
  } else {
    res.status(401).json({ error: "User does not exist" });
  }
};

module.exports = loginCtrl;
