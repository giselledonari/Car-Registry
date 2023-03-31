const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");

require("dotenv").config();

//funcion para tener la informacion del token
async function perfil(token) {
  if (!token) {
    return "";
  }
  try {
    const decodedToken = await jwt.verify(token, process.env.SECRETO);
    return decodedToken;
  } catch (err) {
    console.log(err);
    return "";
  }
}

// Configurar el middleware de multer

//perfil
const storageP = multer.diskStorage({
  destination: path.join(__dirname, "../../public/uploads/perfiles"),
  filename:  (req, file, cb) => {
      cb(null, Date.now()+ path.extname(file.originalname));
  }
})
const uploadImagePerfil = multer({
  storage:storageP,
  limits: {fileSize: 10000000} //10mb
}).single('foto'); //campo del form

//foto autos
const storageA = multer.diskStorage({
  destination: path.join(__dirname, "../../public/uploads/Autos"),
  filename:  (req, file, cb) => {
      cb(null, Date.now()+ path.extname(file.originalname));
  }
});

const uploadImageA = multer({
  storage: storageA,
  limits: {fileSize: 10000000} //10mb
}).single('fotoAuto')


////
module.exports = { perfil, uploadImagePerfil, uploadImageA };