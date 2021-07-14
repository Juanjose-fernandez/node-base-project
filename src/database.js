// conexion a base de datos
const mongoose = require("mongoose");

// Si no existe la base de datos la crea.
// El objeto process es el objeto que representa  al sistema operativo, al entorno

//contruimos la uri de la base de datos.

const URI = process.env.MONGODB_URI
  ? process.env.MONGODB_URI
  : "mongodb://localhost/databaseTEST";

// Cadena de conexión
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

// Cuando la conexion sea abierta
connection.once("open", () => {
  console.log("DB is connected");
});
