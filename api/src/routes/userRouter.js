const {Router} = require("express");
const User = require("../tempData/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRouter = Router()
 const pass = "1234"
const usuarioBD = async() => {
  const hashedPassword = await bcrypt.hash(pass.toString(), 10);
  return {
    user: "miguel",
    password: hashedPassword
  };
}

// Rutas de autenticación
userRouter.post('/api/login', async (req, res) => {
  
  const { user, password } = req.body;
  const usuario = await usuarioBD()
  
  try {
    if (user===usuario.user){
        console.log('vamos por aqui');
        const isPasswordValid = await bcrypt.compare(password, usuario.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Credenciales inválidas' });
        }
      } else {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
      
      // Verificar si el usuario existe
      
      // Autenticación exitosa
      // Generar y devolver un token JWT aquí
      const secretKey = "my_secret"
      const token = jwt.sign({ userId: usuario.user }, secretKey, { expiresIn: '1h' });
      res.json({ token });

    } catch (error) {
        console.error('Error al autenticar al usuario:', error);
        res.status(500).json({ message: 'Error de servidor' });
    }


    // // Aquí puedes implementar la lógica para autenticar al usuario
    // const { email, password } = req.body;

    // try {
    //   // Buscar al usuario por email en la base de datos
    //   const user = await User.findOne({ email }); //? buscar por email o por nombre de usuario
    //   // Verificar si el usuario existe
    //   if (!user) {
    //     return res.status(401).json({ message: 'Credenciales inválidas' });
    //   }

    //   const isPasswordValid = await bcrypt.compare(password, user.password);
    //     if (!isPasswordValid) {
    //     return res.status(401).json({ message: 'Credenciales inválidas' });
    //     }

    // // Autenticación exitosa
    // // Generar y devolver un token JWT aquí
    // const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
    // res.json({ token });

    // } catch (error) {
    //     console.error('Error al autenticar al usuario:', error);
    //     res.status(500).json({ message: 'Error de servidor' });
    // }
});

userRouter.post('/api/register', async (req, res) => {
    // Aquí puedes implementar la lógica para registrar un nuevo usuario
    const { user, password } = req.body; //? nombre de usuario y password

    try {
    // Verificar si el usuario ya está registrado
        const existingUser = await User.findOne({ user });
        if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya está registrado' });
        }

        // Crear una instancia del modelo User y guardar en la base de datos
        const newUser = new User({
        user,
        password: await bcrypt.hash(password, 10), // Cifrar la contraseña
        });
        await newUser.save();
        res.status(201).json({ message: 'Registro exitoso' });

    } catch (error) {
      console.error('Error al registrar al usuario:', error);
      res.status(500).json({ message: 'Error de servidor' });
    }
  });
  
  // Otras rutas de tu aplicación...


//   // Ejemplo de protección de ruta
// userRouter.get('/api/profile', authenticate, (req, res) => {
//     // Aquí puedes acceder a req.userId para obtener el ID del usuario autenticado
//     // y realizar acciones relacionadas con el perfil del usuario
//   });

  module.exports = userRouter