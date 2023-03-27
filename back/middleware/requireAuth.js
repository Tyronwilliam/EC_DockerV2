const jwt = require("jsonwebtoken");
const { findUserById } = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ msg: "Unauthorize" });

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    req.user = await findUserById(id);
    
    next();

  } catch (error) {
    console.log(error, "Error");
    return res.json({ error: "Unauthorize", status: 401 });
  }
};
module.exports = requireAuth;
