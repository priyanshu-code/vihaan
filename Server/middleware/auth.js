require("dotenv").config();
const { UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Unauthorized");
  }
  const token = authorization.split(" ")[1];
  const isAuth = jwt.verify(token, process.env.JWT_SECRET);
  if (!isAuth) {
    throw new UnauthenticatedError("Unauthorized");
  }

  req.body.userId = isAuth.id;
  next();
};

module.exports = authMiddleware;
