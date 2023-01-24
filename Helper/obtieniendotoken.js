const Token = (authorization) => {
  try {
    const token = authorization.split("Bearer ")[1];
    return token;
  } catch (error) {
    throw { code: 402, message: "sin el token" };
  }
};

module.exports = { Token };
