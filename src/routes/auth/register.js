const { Router } = require("express");
const router = Router();

const { register } = require("../../controllers/auth/registerController");

// UserValidations
const userValidation = require("../../validations/userValidation");

//ruta inicial
router.route("/").post(userValidation.create, register);

module.exports = router;
