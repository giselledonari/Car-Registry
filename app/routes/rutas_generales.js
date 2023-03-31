const express = require("express");
const router = express.Router();
const path = require("path");


//rutas pages
router.get("/",async (req, res) => {
    res.sendFile(path.join(__dirname , "../../public/views/index.html"));
})

router.get("/login",async (req, res) => {
    res.sendFile(path.join(__dirname , "../../public/views/login.html"));
})

router.get("/perfil",async (req, res) => {
    res.sendFile(path.join(__dirname , "../../public/views/perfil.html"));
})

router.get("/registro",async (req, res) => {
    res.sendFile(path.join(__dirname , "../../public/views/registro.html"));
})

module.exports = router