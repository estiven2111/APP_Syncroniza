const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../db");

const pass = "1234";
const usuarioBD = async () => {
  const hashedPassword = await bcrypt.hash(pass.toString(), 10);
  return {
    user: "miguel",
    password: hashedPassword,
  };
};

const login = async (req, res) => {
  const { user, password } = req.body;
  const existUser = await User.findOne({ where: { email: user } });
 

  try {
    
    let usuario;
    if (existUser) {
      usuario = existUser.dataValues;
      const isPasswordValid = await bcrypt.compare(password, usuario.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Clave incorrecta" });
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
    const token = jwt.sign({ userId: usuario.email }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error("Error al autenticar al usuario:", error);
    res.status(500).json({ message: "Error de servidor" });
  }
};

module.exports = login;
