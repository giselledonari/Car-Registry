const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
require("dotenv").config();

const { perfil, uploadImagePerfil, uploadImageA } = require("./midlewares.js");
const { usuarios } = require("../controllers/usuarios.js");
const { autos } = require("../controllers/autos.js");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//rutas pages
router.post("/form/login", async (req, res) => {
  const email = req.body.email;
  const contrasena = req.body.contrasena;

  try {
    const prueba1 = await usuarios.buscarCorreo(email);
    
    if (prueba1.length > 0) {
      let contrasenaCheck = await bcrypt.compare(
        contrasena,
        prueba1[0].password
      );

      if (contrasenaCheck) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 1, //*1 1 hora
            email: email,
            id: prueba1[0].id,
          },
          process.env.SECRETO
        );

        res.cookie("myToken", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 1000 * 60 * 60 * 1,
        });

        res.status(200).send({ mensaje: "loggeado" });
      }
    } else {
      res.status(500).send({ err: "Correo no existe" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: "No se pudo hacer login" });
  }
});

router.post("/form/registro", uploadImagePerfil, async (req, res) => {
  const email = req.body.email;
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const foto = req.file.filename;
  const contrasena = req.body.contrasena;
  const cont_encript = await bcrypt.hash(contrasena, 8);

  try {
    const prueba1 = await usuarios.buscarCorreo(email);

    if (prueba1.length > 0) {
      res.send({ err: "Email ya existe, inicie sesion" });
    } else {
      await usuarios.registro(email, nombre, apellido, foto, cont_encript);
      res.status(200).send({ mensaje: "registrado" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: "No se pudo agregar al usuario" });
  }
});

router.post("/form/agregarAutos", uploadImageA, async (req, res) => {
  const token = req.cookies.myToken;
  const marca = req.body.marca;
  const modelo = req.body.modelo;
  const year = req.body.year;
  const imagen = req.file.filename;
  
  if (token) {
    try {
      const user = await perfil(token);
      const id_usuario = await user.id;

      await autos.registro(marca, modelo, year, imagen, id_usuario);
      res.status(200).send({ mensaje: "Automovil registrado" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ err: "No se pudo agregar el automovil" });
    }
  } else {
    res.status(500).send({ err: "Usuario no logeado" });
  }
});

router.get("/api/informacion", async (req, res) => {
  const token = req.cookies.myToken;

  if (token) {
    try {
      const user = await perfil(token);
      const id_usuario = await user.id;

      let informacion = await usuarios.informacion(id_usuario);
      res.json(informacion);
    } catch (err) {
      console.log(err);
      res.status(500).send({ err: "Usuario no logeado" });
    }
  } else {
    res.status(500).json({ err: "Usuario no logeado" });
  }
});

router.get("/api/autos", async (req, res) => {
  try {
    let informacion = await autos.getAutos();
    res.json(informacion);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

module.exports = router;
