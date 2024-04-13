const { verify } = require("jsonwebtoken");
const ErrorHandling = require("../utils/ErrorHandling");
const authConfig = require("../configs/auth");

function authentication(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new ErrorHandling("JWT token not provided", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: id } = verify(token, authConfig.jwt.secret);
    request.company = {
      id: Number(id),
    };

    return next();
  } catch {
    throw new ErrorHandling("Invalid JWT token");
  }
}

module.exports = authentication;
