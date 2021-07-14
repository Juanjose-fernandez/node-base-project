const { Router } = require("express");
const router = Router();

const { login } = require("../../controllers/auth/loginController");

// UserValidations
//const userValidation = require("../../validations/userValidation");

//ruta inicial
router.route("/").post(login);

module.exports = router;
