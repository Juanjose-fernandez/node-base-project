//recogemos las variables de entorno
require("dotenv").config();
// Arranque del servidor
const app = require("./app");
require("./database");

// TODO: revisar async await ecmascript 5 y enteraste bien de como funciona
async function main() {
  // iniciar el servidor que escuche en el peurto 4000
  await app.listen(app.get("port"));
  console.log("Server on port: " + app.get("port"));
}

main();
