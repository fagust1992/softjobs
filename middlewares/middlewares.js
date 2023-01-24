const jwt = require("jsonwebtoken");
const { Token } = require("../Helper/obtieniendotoken");
const checkcredenciales = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw {
        code: 401,
        message: "el campo email y password no pueden estar vacios",
      };
    }
    next();
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};

const reporte = async (req, res, next) => {
  const ruta = req.url;

  console.log(
    `
      hoy ${new Date()}
      query recibida en la ruta ${ruta}
      
    `
  );
  return next();
};

const token_verificacion = (req, res, next) => {
  try {
    const token = Token(req.header("Authorization"));
    jwt.verify(token, "az_AZ");
    next();
  } catch (error) {
    res.status(error.code || 498).send(error);
  }
};

module.exports = { checkcredenciales, reporte, token_verificacion };
