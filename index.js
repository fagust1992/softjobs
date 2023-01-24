const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const {
  registrar_Usuario,
  credenciales,
  obtener_usuarios,
} = require("./consultas");

const {
  checkcredenciales,
  reporte,
  token_verificacion,
} = require("./middlewares/middlewares");

const { Token } = require("./Helper/obtieniendotoken");

app.listen(3000, console.log("SERVER ON"));
app.use(cors());
app.use(express.json());

app.post("/usuarios", reporte, checkcredenciales, async (req, res) => {
  try {
    const user = req.body;
    await registrar_Usuario(user);
    res.send("Usuario creado correctamente");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/login", reporte, checkcredenciales, async (req, res) => {
  try {
    const { email, password } = req.body;
    await credenciales(email, password);
    const token = jwt.sign({ email }, "az_AZ");
    res.send(token);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
});
app.get("/usuarios", reporte, token_verificacion, async (req, res) => {
  try {
    const { email } = jwt.decode(Token(req.header("Authorization")));

    const usuario = await obtener_usuarios(email);
    res.json(usuario);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});
