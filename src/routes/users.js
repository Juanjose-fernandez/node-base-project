const { Router } = require("express");
const router = Router();
const jwt = require("express-jwt");

//TODO: refactor secret creation
//Create Secret for
const secret = {
  secret: process.env.JWT_SECRET || "example",
  algorithms: ["HS256"],
};

const {
  getUsers,
  createUser,
  deleteUser,
} = require("../controllers/usersController");
// UserValidations
const userValidation = require("../validations/userValidation");

router
  .route("/")
  .all(jwt(secret))
  .get(getUsers)
  .post(userValidation.create, createUser);

router.route("/:id").delete(jwt(secret), deleteUser);

module.exports = router;
