const app = require("./src/app")

// Iniciar el servidor
const port = 5000; // Puedes cambiar el número de puerto si lo deseas
app.listen(port, () => {
  console.log(`Servidor backend escuchando en el puerto ${port}`);
});
