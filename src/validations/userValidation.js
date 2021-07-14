const User = require("../models/User");

const userValidation = {};

userValidation.create = async (req, res, next) => {
  let isValid = false;
  const { username, password } = req.body;
  const newUser = new User({
    username,
    password,
  });
  newUser
    .validate()
    .then(() => {
      isValid = true;
    })
    .catch((error) => {
      //Validation error
      console.error(error.stack);
      return res.status(422).send({ type: "Valdiation", err: error });
    });

  //Check if user with that username exists
  const exists = await User.exists({ username: username });
  if (exists) {
    //Duplicated entry error
    console.log(
      " Duplicated entry error: " +
        `User with this username: ${newUser.username} already exists!`
    );
    return res.status(422).send({
      type: "Duplicated",
      err: `User with this username: ${newUser.username} already exists!`,
    });
  }

  if (isValid) next();
};

module.exports = userValidation;
