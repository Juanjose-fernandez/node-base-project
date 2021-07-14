const User = require("../models/User");

const userCtrl = {};

userCtrl.getUsers = async (req, res) => {
  console.log(req.user);
  const users = await User.find();
  res.json(users);
};

userCtrl.createUser = async (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({
    username,
    password,
  });
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  newUser.password = await bcrypt.hash(newUser.password, salt);

  newUser.save().then(() => {
    res.json({ msg: "User Saved" });
  });
};

userCtrl.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: "User deleted" });
};

module.exports = userCtrl;
