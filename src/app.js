//Importamos el framework express
const express = require("express");
const cors = require("cors");

// Se arranca el servidor, app es el servidor
const app = express();

// Settings
app.set("port", process.env.PORT || 4000);

console.log(process.env.PORT);
// Middlewares: Funciones que se ejecutan antes de llegar a las rutas.
app.use(cors()); //  Para permitir conexiones externas de otros servers
app.use(express.json()); // Para que reconozca jsons

// Routes

//Endpoint para registrar usuarios
app.use("/api/register", require("./routes/auth/register"));

// Endpoint para logear usuarios
app.use("/api/login", require("./routes/auth/login"));

//Endpoint para acciones con los modelos usuarios
app.use("/api/users", require("./routes/users"));

// post Middleware para  las peticiones sin autorizacion.
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    console.error(err.stack);
    res.status(401).send({ error: err.message });
  }
});

module.exports = app;
