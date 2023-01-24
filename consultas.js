const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "fagust",
  database: "softjobs",
  allowExitOnIdle: true,
});

const obtener_usuarios = async (email) => {
  const value = [email];
  const query = "SELECT * FROM usuarios WHERE email = $1";

  const {
    rows: [usuario],
    rowCount,
  } = await pool.query(query, value);

  const objetonuevo = {
    id: usuario.id,
    email: usuario.email,
    rol: usuario.rol,
    lenguage: usuario.lenguage,
  };
  if (!rowCount) {
    throw new Error("el usuario no fue encontrado en la base de datos");
  }
  return objetonuevo;
};

const registrar_Usuario = async (user) => {
  let { email, password, rol, lenguaje } = user;

  const query = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4)";
  const contraseña_encriptada = bcrypt.hashSync(password);
  password = contraseña_encriptada;
  const values = [email, contraseña_encriptada, rol, lenguaje];
  await pool.query(query, values);
};

const credenciales = async (email, password) => {
  const values = [email];
  const query = "SELECT * FROM usuarios WHERE email = $1";

  const {
    rows: [Usuario],
    rowCount,
  } = await pool.query(query, values);

  const { password: encryptedPass } = Usuario;
  const passwordMatch = bcrypt.compareSync(password, encryptedPass);

  if (!passwordMatch || !rowCount)
    throw { code: 401, message: "Email o contraseña es incorrecta" };
};

module.exports = {
  registrar_Usuario,
  credenciales,
  obtener_usuarios,
};
