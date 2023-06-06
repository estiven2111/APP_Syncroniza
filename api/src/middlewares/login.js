const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, sequelize } = require("../db");
const { LocalStorage } = require("node-localstorage");
const { LoadProyect } = require("./proyect");
const localStorage = new LocalStorage("./local-storage");

// const pass = "1234";
// const usuarioBD = async () => {
//   const hashedPassword = await bcrypt.hash(pass.toString(), 10);
//   return {
//     user: "miguel",
//     password: hashedPassword,
//   };
// };

const login = async (req, res) => {
  const { user, password } = req.body;
  //  const existUser = await User.findOne({ where: { email: user } });
  // const query = `select * from Tbl_USUARIOS where Email = '${user}'`;

  const existUser = await sequelize.query(
    `select * from Tbl_USUARIOS where Email = '${user}'`
  );
  try {
    let usuario;
    if (existUser[0].length > 0) {
      usuario = existUser[0][0];
      // localStorage.setItem("user", JSON.stringify(usuario));

      // const isPasswordValid = await bcrypt.compare(password, usuario.clave);
      if (password !== usuario.clave) {
        res.status(401).json({ message: "Clave incorrecta" });
        return;
      }
    } else {
     return res
        .status(401)
        .json({ message: "Usuario no existe en la base de datos" });
    }

    // Verificar si el usuario existe

    // Autenticación exitosa
    // Generar y devolver un token JWT aquí
    const secretKey = "my_secret";
    const token = jwt.sign({ userEmail: usuario.Email, userName: usuario.Nombre }, secretKey, {
      expiresIn: "12h",
    });
    res.json({ token });
    LoadProyect(usuario.Doc_id)
  } catch (error) {
    console.error("Error al autenticar al usuario:", error);
    res.status(500).json({ message: "Error de servidor" });
  }
};

module.exports = login;
